let express = require('express');
let router = express.Router();

let Post = require('../models/post');
let Comment = require('../models/comment');


router.get('/:id', (req, res, next) => {
    Post.findById(req.params.id).then(doc => {
        Comment.find({post: req.params.id, parent: null}).then(comments => {
            res.render('post', {post: doc, comments: comments});
        });
    });
});

module.exports = router;
