let express = require('express');
let router = express.Router();

let Project = require('../models/project');

router.get('/', (req, res) => {
    Project.find({owner: req.user._id}).exec().then(doc => {
    return res.render('root', {tasks: doc});
    });
});

module.exports = router;
