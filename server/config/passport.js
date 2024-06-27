import passport from 'passport';
import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';
import db from './database.js';

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

export default passport;