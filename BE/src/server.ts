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

const router = await setupRoutes();
app.use("/api", router);

export default app;
