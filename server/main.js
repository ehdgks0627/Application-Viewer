import express from 'express';

var path = require('path');
const app = express();

let port = 3000;


// 경로 '/' 로 들어오는 요청들은 public 폴더로 정적 라우팅합니다.
app.use('/', express.static(__dirname + '/../public'));

app.get('*', (req, res) => {
  console.log('hi');
    res.sendFile(path.resolve(__dirname, './../public/index.html'));
});

const server = app.listen(port, () => {
    console.log('Express listening on port', port);
});
