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
          pfp: account.profile_pic,
          role: account.role || 'user'
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
    return res.json({ 
            authenticated: true, 
            role: req.user.role || 'user' 
        });
  } else {
   res.json({ authenticated: false, role: null });
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

  account.email= req.body.email;
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
})

// const isAuthenticated = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         return next(); 
//     }
//     res.status(401).json({ success: false, message: "Unauthorized: Please log in first" });
// };

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ success: false, message: "Access Denied: Admins Only" });
    }
};

app.get('/admin/accounts', checkAuth, isAdmin, async (req, res) => {
  try {
    const accounts = await Account.find({}).select('-password');
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching accounts', error: error.message });
  }
});
app.delete('/admin/accounts/:userId', checkAuth, isAdmin, async (req, res) => {
  try {
    
    const userId = req.params.userId;

    const deletedAccount = await Account.findById(userId);

    if (!deletedAccount) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (deletedAccount.role === 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Security Restriction: Administrative accounts cannot be deleted.' 
      });
    }

    await Account.findByIdAndDelete(userId);

    res.status(200).json({ message: 'Account deleted successfully from database' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting account', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});