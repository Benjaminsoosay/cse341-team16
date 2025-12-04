const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const mongodb = require('./db/connect');   // uses mongoose.connect inside
const passport = require('./config/passport');
const cors = require('cors');

dotenv.config();

// Debug logs to confirm env variables are loaded
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);
console.log('GOOGLE_CALLBACK_URL:', process.env.GOOGLE_CALLBACK_URL);
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const port = process.env.PORT || 8080;
const app = express();

app
  .use(express.json())
  .use(cors())
  .use(
    session({
      secret: process.env.SESSION_SECRET || '9258da7e79295d2c76d0b3237af30aab',
      resave: false,
      saveUninitialized: false,
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use('/', require('./routes'))
  .use('/users', require('./routes/users'))
  .use('/auth', require('./routes/auth'))   // ✅ mount auth routes
  .use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  });

module.exports = app;

mongodb.initDb((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    if (require.main === module) {
      app.listen(port, () => {
        console.log(`MongoDB connected via Mongoose`);
        console.log(`Connected to database and listening on port ${port}.`);
      });
    } else {
      console.log('Connected to database (test mode).');
    }
  }
});
