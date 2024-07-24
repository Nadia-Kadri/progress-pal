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
      return res.status(400).json({ success: false, message: 'Email is already taken' });
    }
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.error('Error hashing password:', err);
        return res.status(500).json({ success: false, message: 'Error hashing password' });
      }
      const newUser = await createUser(first_name, last_name, email, hash);
      req.login(newUser, err => {
        if (err) {
          return res.status(500).json({ success: false, message: 'Error logging in after registration' });
        }
        res.json({ success: true, user: newUser });
      });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.post('/auth/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Authentication error' });
    }
    if (!user) {
      return res.status(401).json({ success: false, message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Login error' });
      }
      return res.json({ success: true, user });
    });
  })(req, res, next);
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