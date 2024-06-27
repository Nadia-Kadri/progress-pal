import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy } from 'passport-local';
import session from 'express-session';
import env from 'dotenv';

const app = express();
const port = 3000;
const saltRounds = 10;
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
// app.use(express.static('')); Will need in production / after build

// Initialize passport to attach a user property to the request object; allow passport to use express session
app.use(passport.initialize());
app.use(passport.session());

// Create PostgreSQL client and connect to database
const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.user)
    res.send('user homepage');
  } else {
    res.redirect('/login');
  }
});

app.get('/login', (req, res) => {
  res.send('login page');
});

app.get('/register', (req, res) => {
  res.send('register page');
});

app.post('/register', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const checkResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (checkResult.rows.length > 0) {
      res.send('Email is invalid or already taken');
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error('Error hashing password:', err);
        } else {
          const result = await db.query(
            'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [first_name, last_name, email, hash]
          );
          const user = result.rows[0];
          req.login(user, err => {
            res.redirect('/');
          });
          console.log(user);
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

app.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
});

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