const express = require('express');
const router = express.Router();

// Sample user data - make it relevant to your project
const users = [
  { id: 1, name: 'Alex Johnson', email: 'alex@example.com', role: 'member' },
  { id: 2, name: 'Sam Wilson', email: 'sam@example.com', role: 'admin' },
  { id: 3, name: 'Jordan Lee', email: 'jordan@example.com', role: 'member' }
];

// GET /users - Return all users
router.get('/', (req, res) => {
  console.log('Fetching all users');
  try {
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching users'
    });
  }
});

// GET /users/:id - Return a specific user
router.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  console.log(`Looking for user with ID: ${userId}`);
  
  // Basic validation
  if (isNaN(userId)) {
    return res.status(400).json({
      success: false,
      message: 'User ID must be a number'
    });
  }
  
  const user = users.find(u => u.id === userId);
  
  if (user) {
    res.status(200).json({
      success: true,
      data: user
    });
  } else {
    res.status(404).json({
      success: false,
      message: `No user found with ID ${userId}`
    });
  }
});

module.exports = router;
