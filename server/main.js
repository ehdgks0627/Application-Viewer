import express from 'express';

var path = require('path');
const app = express();

let port = 3000;


// 경로 '/' 로 들어오는 요청들은 public 폴더로 정적 라우팅합니다.
app.use('/', express.static(__dirname + '/../public'));

const server = app.listen(port, () => {
    console.log('Express listening on port', port);
});
