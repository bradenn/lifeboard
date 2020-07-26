let mongoose = require('mongoose');

let TaskSchema = new mongoose.Schema({
    owner: {
        type: mongoose.ObjectId,
        ref: 'User',
        autopopulate: {select: 'username'}
    },
    project: {
        type: mongoose.ObjectId,
        ref: 'Project'
    },
    title: String,
    status: Boolean,
    deadline: Date,
    date: {type: Date, default: Date.now}
});

TaskSchema.plugin(require('mongoose-autopopulate'));

let Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
