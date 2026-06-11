require('dotenv').config(); // so we can use .env to store settings
const express = require('express');
const mongoose = require('mongoose'); // for mongodb
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

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
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback'
    },
   async (accessToken, refreshToken, profile, done) => {
      try {
        const userEmail = profile.emails[0].value;
        const googlePhoto = profile.photos && profile.photos[0] ? profile.photos[0].value : '';

        let account = await Account.findOne({ googleId: profile.id });

        if (!account) {
          account = await Account.findOne({ email: userEmail });

          if (account) {
            account.googleId = profile.id;
            if (!account.profile_pic) account.profile_pic = googlePhoto;
            await account.save();
          } else {
            account = await Account.create({
              googleId: profile.id,
              display_name: profile.displayName, 
              email: userEmail,
              profile_pic: googlePhoto,
              experience: 0
            });
          }
        }
        return done(null, account);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

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

      if (!account || !account.password) {
        return done(null, false);
      }
      return done(null, account);
    }
  )
);

passport.serializeUser((account, done) => {
  done(null, account.id);
});

passport.deserializeUser(
  async (id, done) => {
    const account = await Account.findById(id);
    done(null, account);
  }
);

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.json({
      success: false,
      message: "Unauthorized access"
    });
  }
}

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }),
  (req, res) => {
    res.redirect('http://localhost:5173/home'); 
  }
);

app.get('/auth/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ success: true, user: req.user });
  } else {
    res.status(401).json({ success: false, message: "Not authenticated" });
  }
});

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

app.delete('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(400).send('Log out failed.');
      } else {
        res.status(204).end();
      }
    });
  } else {
    res.end();
  }
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
});

app.patch('/account/:userId/update-name', checkAuth, async(req, res) => {
  const account = await Account.findById(req.params.userId);

  if (!account) {
    return res.status(404).json({ error: 'Account not found' });
  }

  account.display_name = req.body.display_name;
  await account.save();
  res.json(account);
});

app.patch('/account/:userId/update-email', checkAuth, async(req, res) => {
  const account = await Account.findById(req.params.userId);

  if (!account) {
    return res.status(404).json({ error: 'Account not found' });
  }

  account.email = req.body.email;
  await account.save();
  res.json(account);
});

app.patch('/account/:userId/update-password', checkAuth, async(req, res) => {
  const account = await Account.findById(req.params.userId);

  if (!account) {
    return res.status(404).json({ error: 'Account not found' });
  }

  account.password = req.body.password;
  await account.save();
  res.json(account);
});

app.patch('/account/:userId/update-pfp', checkAuth, async(req, res) => {
  const account = await Account.findById(req.params.userId);

  if (!account) {
    return res.status(404).json({ error: 'Account not found' });
  }

  account.profile_pic = req.body.profile_pic;
  await account.save();
  res.json(account);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});