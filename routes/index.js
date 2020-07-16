let express = require('express');
let router = express.Router();

router.use('/login', require('./login.js'));
router.use('/register', require('./register.js'));

router.use((req, res, next) => {
    if(req.user != null){
        next();
    }else{
        res.redirect('/login');
    }
});

router.use('/', require('./root'));
router.use('/contribute', require('./contribute'));
router.use('/post', require('./post'));

router.get('/logout', function (req, res, next) {
    if (req.session) {
        req.session.destroy(function (err) {
            if (err) {
                next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

module.exports = router;
