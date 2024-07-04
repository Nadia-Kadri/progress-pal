import { Router } from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { findUserByEmail, createUser } from '../models/userModel.js';

const router = Router();
const saltRounds = 10;

router.post('/auth/register', async (req, res) => {
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
            res.json({ 
              success: true,
              user
            });
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post('/auth/login', passport.authenticate('local'), (req, res) => {
  res.json({ 
    success: true,
    user: req.user
  });
});

router.post('/auth/logout', (req, res, next) => {
  req.logout(err => {
    if (err) { next(err); }
    res.json({ success: true });
  });
});

router.get('/auth/check', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ 
      isAuthenticated: true,
      user: req.user
    });
  } else {
    res.json({ 
      isAuthenticated: false ,
      user: null
    });
  }
});

export default router;