let express = require('express');
let router = express.Router();
let User = require('../models/user');

router.get('/', (req, res) => {
    return res.render('register');
});

router.post('/', (req, res) => {
    if(req.body.username && req.body.password && req.body.email){
        let payload = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        };
       User.create(payload).then(user => {
           req.session.userId = user._id;
           res.redirect('/');
       }).catch(err => {
           req.session.error = "Username or Email already in use.";
           res.redirect('back');
       });
    }else{
        req.session.error = "You must complete all fields.";
        res.redirect('back');
    }
});

module.exports = router;
