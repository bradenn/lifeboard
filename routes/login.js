let express = require('express');
let User = require('../models/user');
let router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res) => {
    if(req.body.username && req.body.password){
        User.authenticate(req.body.username, req.body.password).then(user => {
            req.session.userId = user._id;
            res.redirect('/');
        }).catch(err => {
            req.session.error = "Incorrect username or password.";
            res.redirect('back');
        });
    }else{
        req.session.error = "You must complete all fields.";
        res.redirect('back');
    }
});

module.exports = router;
