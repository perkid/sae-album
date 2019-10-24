const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Friend = new Friend({
    username : String,
    friends : [ String ]
})

module.exports = mongoose.model('friend', Friend);