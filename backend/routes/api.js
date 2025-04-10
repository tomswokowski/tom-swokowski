const express = require('express');
const { ensureAuthenticated } = require('../middleware/ensureAuth');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello from backend' });
});

router.get('/user', ensureAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
