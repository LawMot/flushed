const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
    display_name: String,

    password: String,
    
    experience: {
        type: Number,
        default: 0
    },

    email: String,

    profile_pic: String,

    role: {
        type: String,
        enum: ['user', 'admin'], 
        default: 'user'
    },
    
    googleId: { 
        type: String, 
        unique: true, 
        sparse: true
    }
});

module.exports = mongoose.model("Account", AccountSchema);