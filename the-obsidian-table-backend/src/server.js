import "dotenv/config";
import express from "express";
import cors from "cors";
import restaurantsRouter from "./routes/restaurants.js";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || /^http:\/\/localhost:\d+$/.test(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
  }),
);
app.use(express.json());

app.use("/api/restaurants", restaurantsRouter);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
