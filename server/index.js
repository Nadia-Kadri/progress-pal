import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy } from 'passport-local';
import session from 'express-session';
import env from 'dotenv';
import userRoutes from './routes/userRoutes.js';
// import habitRoutes from './routes/habitRoutes.js';
import db from './config/database.js';

const app = express();
const port = 3000;
env.config();

// Express session middleware to store user session when user is logged in
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('')); To be used in production

// Initialize passport to attach a user property to the request object; allow passport to use express session
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(userRoutes);
// app.use(habitRoutes);

// Configure local strategy to verify user when passport.authenticate() is called
passport.use(
  'local',
  new Strategy({ usernameField: 'email' }, async function verify(email, password, done) {
    try {
      const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.error('Error comparing passwords:', err);
            return done(err);
          } else {
            if (valid) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          }
        });
      } else {
        return done('Invalid email');
      }
    } catch (err) {
      console.log(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});