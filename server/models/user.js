// /models/user.js
import mongoose from 'mongoose';

// Define the User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String, 
        required: true, 
        unique: true 
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
export default userSchema;
