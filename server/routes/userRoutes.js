import { Router } from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import db from '../config/database.js';

const router = Router();
const saltRounds = 10;

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.user)
    res.send('user homepage');
  } else {
    res.redirect('/login');
  }
});

router.get('/login', (req, res) => {
  res.send('login page');
});

router.get('/register', (req, res) => {
  res.send('register page');
});

router.post('/register', async (req, res) => {
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

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
});

export default router;