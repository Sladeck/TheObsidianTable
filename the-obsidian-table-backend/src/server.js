import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import path from "node:path";
import restaurantsRouter from "./routes/restaurants.js";
import authRouter from "./routes/auth.js";
import uploadsRouter from "./routes/uploads.js";

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "").split(",").filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || /^http:\/\/localhost:\d+$/.test(origin) || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(express.static(path.join(process.cwd(), "public")));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/auth/login", authLimiter);
app.use("/api/auth/verify-2fa", authLimiter);

app.use("/api/restaurants", restaurantsRouter);
app.use("/api/auth", authRouter);
app.use("/api/uploads", uploadsRouter);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", (req, res) => {
  res.status(404).json({ error: "Not found" });
});

// SPA fallback for client-side routed pages. Express 5 (path-to-regexp v6)
// no longer treats a bare "*" string as match-everything, so this uses a
// RegExp directly. The negative lookahead keeps missing /uploads/* files
// from being swallowed into index.html.
app.get(/^\/(?!uploads\/).*/, (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Something went wrong" });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
