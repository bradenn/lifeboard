let express = require('express');
let router = express.Router();

router.get('/', (req, res, next) => {
    res.render('contribute');
});

router.post('/', (req, res, next) => {

});

module.exports = router;
