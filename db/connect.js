const mongoose = require('mongoose');

let _db;

const initDb = async (callback) => {
  try {
    // ✅ just pass the URI, no extra options needed
    _db = await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected via Mongoose');
    callback();
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    callback(err);
  }
};

const getDb = () => _db;

module.exports = { initDb, getDb };

