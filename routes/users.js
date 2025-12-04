const express = require('express');
const router = express.Router();
const User = require('../models/user'); // must match filename exactly

// GET /users → return all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ success: false, message: 'Error fetching users' });
  }
});

// GET /users/:id → return one user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ success: false, message: 'Error fetching user' });
  }
});

// POST /users/seed → insert sample user
router.post('/seed', async (req, res) => {
  try {
    const user = await User.create({
      googleId: 'seed123',
      name: 'Seed User',
      email: 'seed@example.com',
      avatar: 'https://example.com/avatar.png'
    });
    res.json(user);
  } catch (err) {
    console.error('Error seeding user:', err);
    res.status(500).json({ success: false, message: 'Error seeding user' });
  }
});

module.exports = router;
