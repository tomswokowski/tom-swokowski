const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello from backend' });
});

router.get('/user', (req, res) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.json({ user: null });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ user: decoded });
  } catch {
    return res.json({ user: null });
  }
});

module.exports = router;
