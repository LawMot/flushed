import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    experience: Number,
    password: String,
});

export default mongoose.model('User', UserSchema);