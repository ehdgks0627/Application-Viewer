import express from 'express';

import api from './routes/api';
import socket from './routes/socket';

const http = require('http');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const socketServer = require('socket.io');

const app = express();

const port = 3000;

//morgan으로 로깅
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// pi는 따로 라우팅
app.use('/api', api);

// assets 는 폴더에서 라우팅
app.use('/assets', express.static(path.join(__dirname + '/../public/assets')));

// 이외의 모든 요청은 index.html
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './../public/index.html'));
});

var server = http.createServer(app);
var io = socketServer(server);

server.listen(port, ()=> {
    console.log("Express & SocketIO listening on port");
});

/***************************************************************************************** */
/* Socket logic starts here																   */
/***************************************************************************************** */

io.on('connection', function (socket) {

  	socket.on('newAlert', (alertData) => {
      io.emit('newAlert', alertData);
  	});
});
