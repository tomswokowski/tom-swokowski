const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(cors());
}

// Static files (for prod)
app.use(express.static(path.join(__dirname, 'public')));

// Example API
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// SPA fallback (for Vue in prod)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
