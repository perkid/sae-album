const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const url = require('url');



const storage = multer.diskStorage({ //서버에 파일 저장 관리
    destination(req, file, callback) {
        var url = req.url;

        var email = url.substr(url.lastIndexOf('/') + 1);

        // const upath = req.body.email;
        callback(null, `public/uploads/${email}/profile`);  //저장 경로
    },
    filename(req, file, callback){ //파일의 이름 지정
        
        const ext = path.extname(file.originalname); // 확장자
        const uploadFile = path.basename(file.originalname, ext)+'_'/*+userId+'_'*/+new Date().valueOf() +ext;
        callback(null, uploadFile);

        // let array = file.originalname.split('.'); 
        // array[0] = array[0] + '_';
        // array[1] = '.' + array[1];
        // array.splice(1, 0, Date.now().toString()); 
        // const result = array.join(''); 
        // console.log(result); 
        // callback(null, result); //다른방식? or 파일 여러개?

    }
});

//파일 허용 범위 체크
const fileFilter = (req, file, callback) => {
    var ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return callback(res.end('Only images are allowed'), null)
    }
    callback(null, true);
}

const upload = multer ({
    storage: storage,
    // fileFilter: fileFilter,
    limits: {
            //  files: 10,  //파일숫자
             fileSize: 10 * 1024 * 1024
            }
});

router.post('/photo/:email', upload.array('photo', 1), (req, res, next) => {
    try {
        const files = req.files;
        let originalName = '';
        let fileName = '';
        let mimeType = '';
        let size = 0;
        
        if (Array.isArray(files)) {
            console.log(`files is array~`);
            originalName = files[0].originalname;
            fileName = files[0].filename;
            mimeType = files[0].mimetype;
            size = files[0].size;
        } else {
            console.log(`파일개수 1개`);
            originalName = files[0].originalname;
            fileName = files[0].filename;
            mimeType = files[0].mimetype;
            size = files[0].size;
        }
        console.log(`file inform : ${originalName}, ${fileName}, ${mimeType}, ${size}`);
        
        let url = req.url;
        let email = url.substr(url.lastIndexOf('/') + 1);
        let path = `uploads/${email}/profile/${fileName}`
        return res.json({
            success: true,
            path: path
        });

    } catch (err) {
        console.dir(err.stack);
    }
});

module.exports = router;
