import express from 'express';
import bodyParser from 'body-parser';
import passport from './config/passport.js';
import session from 'express-session';
import env from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import habitRoutes from './routes/habitRoutes.js';

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
app.use(bodyParser.json());
// app.use(express.static('')); To be used in production

// Initialize passport to attach a user property to the request object; allow passport to use express session
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(userRoutes);
app.use(habitRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});