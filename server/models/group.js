const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Group = new Schema({
    name : String,
    cover : String,
    owner : String,
    participants : [ String ],
    albums : [{
        name: String,
        photos: [{
                    uploader: String,
                    path: String, 
                    likes:[String],
                    saved:[String],
                    date: { type: Date, default: Date.now } 
        }],
        
    }],
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('group', Group);