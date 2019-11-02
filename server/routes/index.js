const express = require('express');
const account = require('./account');
const uploadfile = require('./uploadfile');
const friend = require('./friend');
const notification = require('./notification');

const router = express.Router();
router.use('/account', account);
router.use('/upload', uploadfile);
router.use('/friend', friend);
router.use('/notification', notification);

module.exports = router;