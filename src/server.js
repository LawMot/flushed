import process from 'dotenv'
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';

const app = express();

app.use(session({
    secret: 'flushed-secret',
}))

app.use(passport.initialize());

app.use(passport.session());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('MongoDB Connected');
})

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.json({
      success: false
    });
  }
}

import User from './models/User';
import Bathroom from './models/Bathroom';
import Review from './models/Review'

app.get('/:userId/name', checkAuth, async(req, res) => {
    const message = await User.find({
        name: req.params.name
    });
    res.json(message);
})