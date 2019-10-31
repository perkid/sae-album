const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Notification = new Schema ({
    sender: String,
    receiver: String,
    type: Number,
    /*
        0 : Friend Rquest
        1 : Create Group
        2 : Add Album
    */
    date: { type: Date, default: Date.now },
    checked: Boolean
});

module.exports = mongoose.model('notification', Notification);