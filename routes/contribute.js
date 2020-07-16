let express = require('express');
let router = express.Router();

let Post = require('../models/post');

router.get('/', (req, res, next) => {
    res.render('contribute');
});

router.post('/', (req, res, next) => {
    Post.create({
        user: req.user._id,
        title: req.body.title,
        body: req.body.body,
        type: req.body.type,
    }).then(doc => {
        res.redirect(`/post/${doc._id}`);
    });
});

module.exports = router;
