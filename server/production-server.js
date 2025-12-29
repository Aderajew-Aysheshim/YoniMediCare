const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the client build directory
app.use(express.static(path.join(__dirname, 'client/dist')));

// Handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

module.exports = app;
