require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();

const productsRouter = require("./routes/products");

const PORT = process.env.PORT;

app.use(cors({
  origin: [`http://localhost:${PORT}`, "http://localhost:5173"]
}));
app.use(express.json());

app.use("/products", productsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});