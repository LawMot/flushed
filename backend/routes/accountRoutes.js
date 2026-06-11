const express = require("express");
const passport = require("passport");

const router = express.Router();

const {
    getAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
} = require("../controllers/AccountController");
const passport = require("passport");

router.get("/", getAccounts);
router.post("/", createAccount);
router.put("/:id", updateAccount);
router.delete("/:id", deleteAccount);

router.get('/google', 
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);
router.get('/google/callback', 
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req,res) => {
        res.redirect(process.env.CLIENT_URL);
    }
);
router.get('/me', (req,res) => {
    res.json(req.account || null);
});

router.get('/logout', (req,res) => {
    req.logout(() => {
        res.json({message: 'Logged Out'});
    });
});

module.exports = router;