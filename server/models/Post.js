const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mediaUrl: {
        type: String,
        required: true
    },
    mediaType: {
        type: String,
        enum: ['image', 'video'], // Can only be one of these two values
        required: true
    },
    caption: {
        type: String,
        default: ''
    },
    tags: [{ // For hashtags like #landscape
        type: String,
        lowercase: true
    }],
    location: {
        type: String,
        default: ''
    },
    gearInfo: { // To store camera/lens details
        camera: String,
        lens: String,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;