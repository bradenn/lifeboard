let mongoose = require('mongoose');

let PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String
    },
    type: {
        type: String,
        enum: ['opinion', 'discussion'],
        default: 'opinion'
    },
    likes: [{
        type: mongoose.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: mongoose.ObjectId,
        ref: 'User'
    }],
    date: {type: Date, default: Date.now}
});

let Post = mongoose.model('Post', PostSchema);

module.exports = Post;
