const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // Add a unique username for mentions and profile links
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    displayName: { // Use this for the user's full name
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { // Remember to hash this before saving!
        type: String,
        required: true
    },
    photoURL: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    socialLinks: [
        {
            platform: String, 
            url: String
        }
    ],
    // Simplified followers/following arrays
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;