const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const Account = new Schema({
    email: String,
    username: String,
    name: String,
    password: String,
    created: { type: Date, default: Date.now },
    profile: {
        photo: String,
        bio: String,
    }
});

// generates hash
Account.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, 8);
};

// compares the password
Account.methods.validateHash = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('account', Account);