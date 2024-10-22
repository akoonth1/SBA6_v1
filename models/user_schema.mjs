import mongoose from "mongoose";
import dotenv from 'dotenv';
import error from '../errorhandle.mjs';
dotenv.config();


const userSchema = new mongoose.Schema({
    idNum: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    favorites: {
        type: [String],
        required: true
    }
});

userSchema.index({ idNum: 1 }, { unique: true });

export default mongoose.model('User', userSchema);