let mongoose = require('mongoose');

let ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    proposal: String,
    motivation: String,
    unicity: String,
    todo: [{
        title: String,
        status: Boolean,
        deadline: Date
    }],
    status: {
        type: String,
        enum: ['wip', 'paused', 'abandoned', 'completed']
    },
    date: {type: Date, default: Date.now}
});

let Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
