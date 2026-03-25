import app from "./server.js";
import { startOrderCleanupJob } from "./lib/cleanup.js";

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("\x1b[92m%s\x1b[0m", `Server running on PORT ${PORT}!`);

  // Start periodic cleanup of expired pending orders
  // Interval: 2 minutes
  // Timeout: 15 minutes
  startOrderCleanupJob(2, 15);
});
