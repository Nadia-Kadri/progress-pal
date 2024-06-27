import { Router } from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { findUserByEmail, createUser } from '../models/userModel.js';

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
    const user = await findUserByEmail(email);
    if (user) {
      res.send('Email is invalid or already taken');
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error('Error hashing password:', err);
        } else {
          const user = await createUser(first_name, last_name, email, hash);
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

router.post('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) { next(err); }
    res.redirect('/login');
  });
});

export default router;