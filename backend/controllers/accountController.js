const Account = require("../models/Account");

async function getAccounts(req, res) {
    const accounts = await Account.find();
    res.json(accounts);
}

async function createAccount(req, res) {
    try {
        const existingAccount = await Account.findOne({
            email: req.body.email
        });

        if (existingAccount) {
            return res.status(400).json({
                message: "an account with this email already exists."
            });
        }
        const newAccount = await Account.create(req.body);
        res.json(newAccount);
    } catch (error) {

        res.status(400).json({
            message: "Error creating account",
            error: error.message
        });
    
    }
}

async function updateAccount(req, res) {
    const updatedBook = await Account.findByIdAndUpdate(
        req.params.id, 
        req.body,
        { new: true }
    );
    res.json(updatedBook);
}

async function deleteAccount(req, res) {
    await Account.findByIdAndDelete(req.params.id);
    res.json({ message: "Account deleted" });
}

module.exports = {
    getAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
};