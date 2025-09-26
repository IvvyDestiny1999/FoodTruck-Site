// server.js - simple Express static server for Render deployment
// Purpose: serve static files from project root and fallback to index.html
// No visual files modified.

const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname);

app.use(express.static(ROOT, { maxAge: "1h", index: false }));

app.get("*", (req, res) => {
  res.sendFile(path.join(ROOT, "index.html"));
});

app.listen(PORT, () => {
  console.log("FoodTruck site rodando na porta " + PORT);
});