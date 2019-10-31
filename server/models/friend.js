const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Friend = new Schema({
    username : String,
    friends : [{ 
        username: String,
        status: Number
        /*
        0 : request
        1 : allowed
        */
    }],

})

module.exports = mongoose.model('friend', Friend);