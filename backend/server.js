require('dotenv').config(); // so we can use .env to store settings
const express = require('express');
const mongoose = require('mongoose'); // for mongodb
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const app = express();

app.use(cors({ // browsers block requests from different origins unless the server explicitly allows it
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());

app.use(passport.session());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB Connected');
});

const Account = require('./models/Account');
const Review = require('./models/Review');

passport.use(
    new LocalStrategy(
    {
      usernameField: 'email'
    },
    async function(email, password, done) {
      const account = await Account.findOne({
        email: email,
        password: password
      });

      if (!account) {
        return done(null, false);
      }
      return done(null, account);
    }
  )
);

passport.serializeUser(function(account, done) {
  done(null, account.id);
});

passport.deserializeUser(
  async function(id, done) {
    const account = await Account.findById(id);
    done(null, account);
  }
);

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.json({
      success: false
    });
  }
}

app.post('/signup', async (req, res) => {
  const account = await Account.create({
    display_name: req.body.dname,
    email: req.body.email,
    password: req.body.password,
    experience: 0
  });
  res.json(account);
});

app.post('/login', (req, res, next) => {

  passport.authenticate(
    'local',
    (err, account) => {

      if (err) {
        return next(err);
      }

      if (!account) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      req.login(account, (err) => {

        if (err) {
          return next(err);
        }

        return res.json({
          success: true,
          display_name: account.display_name,
          email: account.email,
          experience: account.experience,
          password: account.password,
          userId: account._id,
          pfp: account.profile_pic
        });

      });

    }
  )(req, res, next);

});

app.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

app.get('/check-auth', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
});

app.get('/reviews/:userId', checkAuth, async(req, res) => {
  const reviews = await Review.find({
    userId: req.params.userId
  });
  res.json(reviews);
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});