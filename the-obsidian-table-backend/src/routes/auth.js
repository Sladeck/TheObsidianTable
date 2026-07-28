import { Router } from "express";
import bcrypt from "bcryptjs";
import { authenticator } from "otplib";
import QRCode from "qrcode";
import {
  issueCookie,
  clearAuthCookies,
  requireAuth,
  requireSetupToken,
  requirePendingToken,
} from "../middleware/auth.js";

const router = Router();

function verifyCode(code, secret) {
  try {
    return authenticator.verify({ token: String(code), secret });
  } catch {
    return false;
  }
}

router.post("/login", async (req, res) => {
  const { username, password } = req.body ?? {};

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  const validUsername = username === process.env.ADMIN_USERNAME;
  const validPassword =
    process.env.ADMIN_PASSWORD_HASH && (await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH));

  if (!validUsername || !validPassword) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  if (!process.env.ADMIN_TOTP_SECRET) {
    issueCookie(res, "setup", { purpose: "setup-2fa" });
    return res.json({ status: "setup-required" });
  }

  issueCookie(res, "pending", { purpose: "pending-2fa" });
  res.json({ status: "2fa-required" });
});

router.post("/verify-2fa", requirePendingToken, (req, res) => {
  const { code } = req.body ?? {};
  const secret = process.env.ADMIN_TOTP_SECRET;

  if (!secret) {
    return res.status(500).json({ error: "Two-factor authentication is not configured" });
  }

  if (!code || !verifyCode(code, secret)) {
    return res.status(401).json({ error: "Invalid code" });
  }

  issueCookie(res, "session", { purpose: "session" });
  res.json({ success: true });
});

router.post("/setup-2fa/generate", requireSetupToken, async (req, res) => {
  if (process.env.ADMIN_TOTP_SECRET) {
    return res.status(410).json({ error: "Two-factor authentication is already configured" });
  }

  const secret = authenticator.generateSecret();
  const otpauthUri = authenticator.keyuri(process.env.ADMIN_USERNAME || "admin", "The Obsidian Table", secret);
  const qrCodeDataUrl = await QRCode.toDataURL(otpauthUri);

  issueCookie(res, "setup", { purpose: "setup-2fa", secret });
  res.json({ qrCodeDataUrl, secret });
});

router.post("/setup-2fa/confirm", requireSetupToken, (req, res) => {
  if (process.env.ADMIN_TOTP_SECRET) {
    return res.status(410).json({ error: "Two-factor authentication is already configured" });
  }

  const { code } = req.body ?? {};
  const secret = req.setupPayload.secret;

  if (!secret) {
    return res.status(400).json({ error: "Generate a code first" });
  }

  if (!code || !verifyCode(code, secret)) {
    return res.status(401).json({ error: "Invalid code" });
  }

  clearAuthCookies(res);
  res.json({ success: true, secret });
});

router.get("/me", requireAuth, (req, res) => {
  res.json({ authenticated: true });
});

router.post("/logout", (req, res) => {
  clearAuthCookies(res);
  res.json({ success: true });
});

export default router;
