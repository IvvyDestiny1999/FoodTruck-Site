// server.js - simple Express static server for Render deployment
// Purpose: serve static files from project root and fallback to index.html
// No visual files modified.

const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname);

app.use(function(req, res, next) {
  // Basic security headers (non-intrusive)
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});

// Serve static files
app.use(express.static(ROOT, {
  // let browser cache static assets for 1 hour
  maxAge: '1h',
  index: false
}));

// Fallback to index.html for client-side routes
app.get('*', function(req, res) {
  const indexPath = path.join(ROOT, 'index.html');
  res.sendFile(indexPath, function(err) {
    if (err) {
      res.status(500).send('Erro ao servir o arquivo index.html');
    }
  });
});

app.listen(PORT, function() {
  console.log('FoodTruck site listening on port', PORT);
});