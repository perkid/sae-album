const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Notification = new Schema ({
    sender: String,
    receiver: String,
    message: String,
    date: { type: Date, default: Date.now },
    checked: Boolean
});

module.exports = mongoose.model('notification', Notification);