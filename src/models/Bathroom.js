import mongoose from 'mongoose';

const BathroomSchema = new mongoose.Schema({
    building: String,
    floor: Number,
    gender: String,
    photo: Image,
});

export default mongoose.model('Bathroom', BathroomSchema);