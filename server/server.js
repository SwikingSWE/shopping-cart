// server/server.js
const express = require("express");
const cors = require("cors");
const inventory = require("./inventory.json");

const app = express();
app.use(cors());

app.get("/api/products", (req, res) => res.json(inventory));
app.get("/api/products/:id", (req, res) => {
  const product = inventory.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: "Not found" });
  res.json(product);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));
