const express = require('express');
const Notification = require('../models/notification');
const Account = require('../models/account');
const router = express.Router();

router.post('/get', (req, res) => {
    Notification.find({ receiver: req.body.username }, (err, notice) => {
        if (err) throw err;
        if (!notice) {
            return res.status(401).json({
                error: "NO NOTIFICATION",
                code: 1
            });
        }
        let query = [];
        let noticeList = [];
        for (let i = 0; i < notice.length; i++) {
            query.push(notice[i].sender)
        }
        Account.find({username: {$in: query }}, (err, account) => {
            if (err) throw err;

            for (let i = 0; i < notice.length; i++){
                for(let j = 0; j < account.length; j ++){
                    if(notice[i].sender===account[j].username){
                        noticeList.push({
                            username:notice[i].sender,
                            photo:account[j].profile.photo,
                            type:notice[i].type
                        })
                    }
                }
            }
            return res.json({
                success: true,
                notice: noticeList,
            });
        })
    }).sort({"_id": -1})


});
module.exports = router;