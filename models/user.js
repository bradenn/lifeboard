let mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    type: {
        type: Number,
        default: 0
    },
    display: {
        type: String
    },
    password: String,
    date: {type: Date, default: Date.now}
});

UserSchema.statics.authenticate = (username, password) => {
    return new Promise((resolve, reject) => {
        User.findOne({"username": {$regex: new RegExp(username, "i")}}).exec().then(user => {
            if (!user) {
                let err = new Error('This user does not exist...');
                err.status = 401;
                reject(err);
            }
            verifyHash(password, user.password).then(() => {
                resolve(user);
            }).catch(() => {
                let err = new Error("Your password is incorrect...");
                reject(err);
            });
        });
    });
};

UserSchema.pre('save', async function (next) {
    let user = this;
    if (!user.isModified('password')) return next();
    user.password = await hashPassword(user.password);
    next();
});

let hashPassword = (password) => new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) reject(new Error(err));
        resolve(hash);
    });
});

let verifyHash = (password, original) => new Promise((resolve, reject) => {
    bcrypt.compare(password, original, function (err, result) {
        if (err) reject(new Error(err));
        resolve(result);
    });
});

let User = mongoose.model('User', UserSchema);

module.exports = User;
