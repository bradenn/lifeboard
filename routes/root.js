let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    return res.render('root');
});

module.exports = router;
