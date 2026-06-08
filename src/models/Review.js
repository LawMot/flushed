import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    userId: String,
    body: String,
    supplies: Number,
    traffic: Number,
    cleanliness: Number,
    aesthetics: Number
});

export default mongoose.model('Review', ReviewSchema);
