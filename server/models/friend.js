const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Friend = new Schema({
    username : String,
    friends : [{ 
        username: String,
        status: String
    }],

})

module.exports = mongoose.model('friend', Friend);