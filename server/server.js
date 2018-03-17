import express from 'express';
import http from 'http';
import https from 'https';
import path from 'path';
import fs from 'fs';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import socketServer from 'socket.io';
import api from './routes/api';
import socket from './routes/socket';

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

let server = http.createServer(app);
let io = socketServer(server);

server.listen(port, "0.0.0.0", ()=> {
    console.log("Express & SocketIO listening on port");
});

/***************************************************************************************** */
/* Socket logic starts here																   */
/***************************************************************************************** */

io.on('connection', socket);

module.exports = {io: io};
