import app from "./server.js";

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`[Server] Running on PORT ${PORT}! ✅`);
});