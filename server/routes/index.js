const express = require('express');
const account = require('./account');
const uploadfile = require('./uploadfile');
const friend = require('./friend');

const router = express.Router();
router.use('/account', account);
router.use('/upload', uploadfile);
router.use('/friend', friend);

module.exports = router;