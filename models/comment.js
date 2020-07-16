let mongoose = require('mongoose');

let CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.ObjectId,
        ref: 'User',
        autopopulate: {select: 'username'}
    },
    body: {
        type: String
    },
    likes: [{
        type: mongoose.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: mongoose.ObjectId,
        ref: 'User'
    }],
    post: {
        type: mongoose.ObjectId,
        ref: 'Post'
    },
    parent: {
        type: mongoose.ObjectId,
        ref: 'Comment'
    },
    children: [{
        type: mongoose.ObjectId,
        ref: 'Comment',
        autopopulate: true
    }],
    date: {type: Date, default: Date.now}
});

CommentSchema.plugin(require('mongoose-autopopulate'));

let Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
