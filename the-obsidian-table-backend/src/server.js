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

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || /^http:\/\/localhost:\d+$/.test(origin)) {
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

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Something went wrong" });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
