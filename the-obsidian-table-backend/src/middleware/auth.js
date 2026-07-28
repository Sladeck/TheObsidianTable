import jwt from "jsonwebtoken";

export const COOKIE_NAMES = {
  setup: "setup_token",
  pending: "pending_token",
  session: "session_token",
};

const MAX_AGE = {
  setup: 10 * 60 * 1000, // 10 minutes
  pending: 5 * 60 * 1000, // 5 minutes
  session: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const baseCookieOptions = () => ({
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
});

function jwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }
  return secret;
}

export function signToken(payload, maxAgeMs) {
  return jwt.sign(payload, jwtSecret(), { expiresIn: Math.floor(maxAgeMs / 1000) });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, jwtSecret());
  } catch {
    return null;
  }
}

export function issueCookie(res, name, payload) {
  const maxAge = MAX_AGE[name];
  const token = signToken(payload, maxAge);
  res.cookie(COOKIE_NAMES[name], token, { ...baseCookieOptions(), maxAge });
  return token;
}

export function clearAuthCookies(res) {
  for (const cookieName of Object.values(COOKIE_NAMES)) {
    res.clearCookie(cookieName, baseCookieOptions());
  }
}

function requirePurpose(cookieName, purpose, payloadKey) {
  return (req, res, next) => {
    const token = req.cookies?.[cookieName];
    const payload = token && verifyToken(token);

    if (!payload || payload.purpose !== purpose) {
      return res.status(401).json({ error: "Session expired, please start over" });
    }

    req[payloadKey] = payload;
    next();
  };
}

export const requireSetupToken = requirePurpose(COOKIE_NAMES.setup, "setup-2fa", "setupPayload");
export const requirePendingToken = requirePurpose(COOKIE_NAMES.pending, "pending-2fa", "pendingPayload");

export function requireAuth(req, res, next) {
  const token = req.cookies?.[COOKIE_NAMES.session];
  const payload = token && verifyToken(token);

  if (!payload || payload.purpose !== "session") {
    return res.status(401).json({ error: "Not authenticated" });
  }

  next();
}
