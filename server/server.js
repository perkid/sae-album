const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

const session = require('express-session');
const mongoose = require('mongoose');


/* mongodb connection */
const db = mongoose.connection;
const api = require('./routes/');



app.use(express.json());
app.use(cors());
/* support client-side routing */
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './../public/index.html'));
});

db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
// mongoose.connect('mongodb://username:password@host:port/database=');
mongoose.connect('mongodb://localhost/sae-album', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(session({
    //secure: true, https 에서만 세션사용
    //HttpOnly : true, 자바스크립트를통해 세션쿠키사용할수없음 (http로만 가능)
    secret: 'SaeAlbum1$1$234', // 필수사항, 깃허브에 소스코드 올리면 X 서버에 올릴때는 다르게 처리해서 올려야함
    resave: false, // 그냥 false....  session data가 변하지 않으면 저장하지 않음..
    saveUninitialized: true,  // 그냥 true..  session이 필요하기 이전에는 구동하지않음
    //store: new FileStore()
  }));
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, '..', 'public/')));
app.use('/api', api);


app.listen(PORT, () => {
    console.log(`Check out the app at http://localhost:${PORT}`);
});