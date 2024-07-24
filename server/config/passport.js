import passport from 'passport';
import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { findUserByEmail } from '../models/userModel.js';

// Configure local strategy to verify user when passport.authenticate() is called
passport.use(
  'local',
  new Strategy({ usernameField: 'email' }, async function verify(email, password, done) {
    try {
      const user = await findUserByEmail(email);
      if (user) {
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) { return done(err); }
          if (valid) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Incorrect password' });
          }
        });
      } else {
        return done(null, false, { message: 'Invalid email'});
      }
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;