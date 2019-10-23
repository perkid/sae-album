const express = require('express');
const Account = require('../models/account');
const router = express.Router();
const path = require('path');
const fs = require('fs');
/*
    ACCOUNT SIGNUP: POST /api/account/signup
    BODY SAMPLE: { "username": "test", "password": "test" }
    ERROR CODES:
        1: BAD USERNAME
        2: BAD PASSWORD
        3: USERNAM EXISTS
*/

router.post('/signup', (req, res) => {
    // CHECK USERNAME FORMAT
    let usernameRegex = /^[a-z0-9]+$/;

    if (!usernameRegex.test(req.body.username)) {
        return res.status(400).json({
            error: "BAD USERNAME",
            code: 1
        });
    }

    // CHECK PASS LENGTH
    if (req.body.password.length < 4 || typeof req.body.password !== "string") {
        return res.status(400).json({
            error: "BAD PASSWORD",
            code: 2
        });
    }

    // CHECK USER EXISTANCE
    Account.findOne({ username: req.body.email }, (err, exists) => {
        if (err) throw err;
        if (exists) {
            return res.status(409).json({
                error: "email EXISTS",
                code: 3
            });
        }
        Account.findOne({ username: req.body.username }, (err, exists) => {
            if (err) throw err;
            if (exists) {
                return res.status(409).json({
                    error: "USERNAME EXISTS",
                    code: 3
                });
            }

            // CREATE ACCOUNT
            let account = new Account({
                email: req.body.email,
                username: req.body.username,
                name: req.body.name,
                password: req.body.password,
                profile: {
                    photo: '',
                    bio: ''
                }
            });

            let email = req.body.email;
            fs.exists(path.join(__dirname, '..', '..', 'public/uploads/') + email, (exists) => {
                if (!exists) {
                    fs.mkdir(path.join(__dirname, '..', '..', 'public/uploads/') + email, () => {
                        console.log('new folder');
                    });
                    fs.mkdir(path.join(__dirname, '..', '..', 'public/uploads/') + email + '/profile', () => {
                        console.log('new folder');
                    });
                    fs.mkdir(path.join(__dirname, '..', '..', 'public/uploads/') + email + '/album', () => {
                        console.log('new folder');
                    });
                }
            });

            account.password = account.generateHash(account.password);

            // SAVE IN THE DATABASE
            account.save(err => {
                if (err) throw err;
                return res.json({ success: true });
            });
        });
    });
});

/*
    ACCOUNT SIGNIN: POST /api/account/signin
    BODY SAMPLE: { "username": "test", "password": "test" }
    ERROR CODES:
        1: LOGIN FAILED
*/
router.post('/signin', (req, res) => {
    if (typeof req.body.password !== "string") {
        return res.status(401).json({
            error: "LOGIN FAILED",
            code: 1
        });
    }

    // FIND THE USER BY USERNAME
    Account.findOne({ email: req.body.email }, (err, account) => {
        if (err) throw err;

        // CHECK ACCOUNT EXISTANCY
        if (!account) {
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            });
        }

        // CHECK WHETHER THE PASSWORD IS VALID
        if (!account.validateHash(req.body.password)) {
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            });
        }
        // ALTER SESSION
        let session = req.session;
        session.loginInfo = {
            _id: account._id,
            email: account.email,
        };

        // RETURN SUCCESS
        return res.json({
            success: true,
            account: account
        });
    });
});
/*
    PUT password CHANGE /api/account/password/change
*/
router.put('/password/change', (req, res) => {
    // CHECK PASS LENGTH

    if (req.body.newPassword1.length < 4 || typeof req.body.newPassword1 !== "string") {
        return res.status(400).json({
            error: "BAD PASSWORD",
            code: 1
        });
    }
    if (req.body.newPassword1 !== req.body.newPassword2) {
        return res.status(400).json({
            error: "비밀번호가 같지 않습니다.",
            code: 1,
        });
    }
    Account.findOne({ email: req.body.email }, (err, account) => {
        if (err) throw err;

        // CHECK WHETHER THE PASSWORD IS VALID
        if (!account.validateHash(req.body.password)) {
            return res.stateus(401).json({
                error: "Worng Password",
                code: 1
            });
        }

        Account.update({ email: req.body.email }, { $set: { password: account.generateHash(req.body.newPassword1) } }, function (err, output) {
            if (err) {
                return res.status(500).json({
                    error: 'database failure',
                    code: 1
                });
            }
            return res.json({ success: true });
        });
    });

});
/*
    PUT PROFILE CHANGE /api/account/profile/change
*/
router.put('/profile/change', (req, res) => {

    Account.findOne({ email: req.body.email}, (err, account) => {
        if(account.username!==req.body.username){
            Account.findOne({ username: req.body.username }, (err, exists) => {
                if (err) throw err;
                if (exists) {
                    return res.status(409).json({
                        error: "USERNAME EXISTS",
                        code: 3
                    });
                }
            });
        }

        Account.update({ email: req.body.email }, { $set: { name: req.body.name, username: req.body.username, profile: { photo: req.body.photo, bio: req.body.bio } } }, (err, output) => {
            if (err) {
                return res.status(500).json({
                    error: 'database failure',
                    code: 1
                });
            }
            let profile = {
                name : req.body.name,
                username : req.body.username,
                bio : req.body.bio
            }
            return res.json({ success: true, profile: profile });
        });
    });

    
});

router.put('/photo/change', (req, res) => {

    Account.findOne({ email: req.body.email}, (err, account) => {

        Account.update({ email: req.body.email }, { $set: { profile: { photo: req.body.path, bio: account.profile.bio } } }, (err, output) => {
            if (err) {
                return res.status(500).json({
                    error: 'database failure',
                    code: 1
                });
            }
            return res.json({ success: true, path: req.body.path });
        });
    });

    
});
/*
    PUT DELETE PROFILE IMG PUT /api/account/profile/img/delete
*/
router.put('/profile/img/delete', (req, res) => {
    Account.findOne({ email: req.body.email }, (err, account)=> {
        if(err) throw err;

        Account.update({email: req.body.email}, {$set: { profile: { photo: '', bio: account.profile.bio }}}, (err, output)=>{
            if (err) {
                return res.status(500).json({
                    error: 'database failure',
                    code: 1
                });
            }
            console.log(output);
            return res.json({ success: true });
        });
    });
});
    
/*
    GET CURRENT USER INFO GET /api/account/getInfo
*/
router.get('/getinfo', (req, res) => {
    console.log(req.session)
    if (typeof req.session.loginInfo === "undefined") {
        return res.status(401).json({
            error: 1
        });
    }

    res.json({ info: req.session.loginInfo });
});


/*
    LOGOUT: POST /api/account/logout
*/
router.post('/logout', (req, res) => {
    delete req.session;
    return res.json({ sucess: true });
});

/* handle error */
router.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});



module.exports = router;