const express = require('express');
const Notification = require('../models/notification');
const router = express.Router();

router.post('/get', (req, res) => {
    Notification.find({ receiver: req.body.username}, (err, notice) => {
        if(err) throw err;
        if(!notice){
            return res.status(401).json({
                error: "NO NOTIFICATION",
                code: 1
            });
        }

        return res.json({
            success: true,
            notice: notice
        });
    })
});
module.exports = router;