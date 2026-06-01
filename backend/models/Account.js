const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
    display_name: String,

    password: String,
    
    eperience: String,

    email: String,


});

module.exports = mongoose.model("Account", AccountSchema);