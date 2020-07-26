let express = require('express');
let router = express.Router();

let Project = require('../models/project');

router.get('/new', (req, res, next) => {
    res.render('newproject');
});

router.get('/:id', (req, res, next) => {
    Project.findById(req.params.id).exec().then(doc => {
        res.render('project', {project: doc});
    })
});

router.post('/', (req, res, next) => {
    let body = req.body;
    let requiredFields = ['name', 'proposal', 'unicity'];
    if(requiredFields.every(item => body.hasOwnProperty(item))){
        Project.create({name: body.name, proposal: body.proposal, unicity: body.unicity, owner: req.user._id}).then(doc => {
            res.redirect(`/projects/${doc._id}`);
        });
    }else{
        res.send(body)
    }
});

module.exports = router;
