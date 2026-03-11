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
app.use("/api", router);

app.get("/orders", (req: express.Request, res: express.Response) => {
  const furgonetkaToken = req.headers["x-furgonetka-token"];
  const expectedToken =
    process.env.FURGONETKA_INTEGRATION_TOKEN || "on-up-super-secret-token";

  console.log(
    "\x1b[93m%s\x1b[0m",
    `[Furgonetka] GET /orders - Received Token: ${furgonetkaToken}`,
  );

  if (furgonetkaToken !== expectedToken) {
    console.warn(
      "\x1b[91m%s\x1b[0m",
      "[Furgonetka] Unauthorized access attempt - tokens do not match!",
    );
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Ngrok bypass (opcjonalnie)
  res.setHeader("ngrok-skip-browser-warning", "69420");

  res.status(200).json({ orders: [] });
});

export default app;
