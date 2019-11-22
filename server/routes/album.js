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
module.exports = router;