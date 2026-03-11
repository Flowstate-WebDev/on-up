import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CORS_CONFIG } from "./config/env.js";
import { setupRoutes } from "./routes/index.js";

const app = express();

// Global Middleware
app.use(cors(CORS_CONFIG));
app.use(cookieParser());
app.use(
  express.json({
    verify: (req: any, res, buf) => {
      req.rawBody = buf.toString();
    },
  }),
);

// Load dynamic routes
const router = await setupRoutes();
console.log("\x1b[92m%s\x1b[0m", "[Server] Routes setup complete");
app.use("/api", router);

app.get("/api/test-ping", (req, res) => {
  res.json({ message: "pong" });
});

export default app;
