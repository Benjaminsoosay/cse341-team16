const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

// Protected dashboard route
router.get('/dashboard', ensureAuth, (req, res) => {
  res.json({ message: `Welcome ${req.user.name}` });
});

// Protected profile route
router.get('/profile', ensureAuth, (req, res) => {
  res.json(req.user);
});

module.exports = router;
