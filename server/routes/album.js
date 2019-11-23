const express = require('express');
const Group = require('../models/group');
const router = express.Router();

router.post('/group/create', (req, res) => {

    let group = new Group({
        name: req.body.name,
        cover: '',
        owner: req.body.owner,
        participants: [],
        albums: [
        ]
    })
    
    group.save(err => {
        if (err) throw err;
    });

    return res.json({ success: true });
});

router.post('/group/list/get', (req, res) => {
    let list = []
    Group.find({ $or :[ {owner: req.body.username}, { Group: {$elemMatch: { participants: req.body.username}}}]}, (err, groups) =>{
        if(err) throw err;
        list.push(groups)
        
        return res.json({
            success: true,
            list: list
        });
    });
})
module.exports = router;