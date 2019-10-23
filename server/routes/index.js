const express = require('express');
const account = require('./account');
const uploadfile = require('./uploadfile');

const router = express.Router();
router.use('/account', account);
router.use('/upload', uploadfile);

module.exports = router;