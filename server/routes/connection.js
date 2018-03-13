import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/test'); // 기본 설정에 따라 포트가 상이 할 수 있습니다.

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/mongodb_tutorial');

module.exports = db;
