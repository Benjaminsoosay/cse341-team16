const User = require('../models/user');

const seedUsers = async (req, res) => {
  try {
    const sampleUsers = [
      {
        googleId: 'test123',
        name: 'Test User',
        email: 'test@example.com',
        avatar: 'https://example.com/avatar.png',
      },
    ];
    const inserted = await User.insertMany(sampleUsers);
    res.json({ success: true, data: inserted });
  } catch (err) {
    console.error('Error seeding users:', err);
    res.status(500).json({ success: false, message: 'Error seeding users' });
  }
};

module.exports = { seedUsers };
