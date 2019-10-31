const express = require('express');
const Friend = require('../models/friend');
const Notification = require('../models/notification');
const router = express.Router();

router.post('/request', (req, res) => {

    Friend.findOne({username: req.body.sender}, (err, exists) => {
        if(err) throw err;
        if(!exists){
            let friendList = new Friend({
                username: req.body.sender,
                friends:[{
                    username: req.body.receiver,
                    status: 0
                }]
            });
            friendList.save(err => {
                if(err) throw err;
            });

            let notification = new Notification ({
                sender: req.body.sender,
                receiver: req.body.receiver,
                type: 0,
                checked: false
            });
            notification.save(err=> {
                if(err) throw err;
            });

            return res.json({ success: true });
            
        }
        for(let i = 0 ; i < exists.friends.length ; i++){
            if(exists.friends[i].username === req.body.receiver){
                return res.status(409).json({
                    error: "already exists request",
                    code: 1
                });
            }
        }
        
        // Friend.update({ username: req.body.sender}, {$push})
        Friend.update({username: req.body.sender}, {$push:{friends:{ username:req.body.receiver, status:0 }}},{ upsert: true }, (err, output)=>{
            if (err) {
                return res.status(500).json({
                    error: 'database failure',
                    code: 1
                });
            }
            let notification = new Notification ({
                sender: req.body.sender,
                receiver: req.body.receiver,
                type: 0,
                checked: false
            });
            notification.save(err=> {
                if(err) throw err;
            });
            
            return res.json({ success: true });
        });
    });
});

module.exports = router;