const mongoose = require('mongoose');
const {MONGO_ID, MONGO_PASSWORD, NODE_ENV} = process.env;
const MONGO_URL = `mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false`;
//`mongodb://${MONGO_ID}:${MONGO_PASSWORD}@localhost:27017/admin`;
const connect = () => {
    if (process.env.NODE_VIEW !== 'production') {
        mongoose.set('debug', true);
    }
    mongoose.connect(MONGO_URL, {
        dbName: '2020-Portfolio'
    }, (err) => {
        if (err) {
            console.error('private chat 몽고디비 연결 에러', err);
        } else {
            console.log('private chat 몽고디비 연결 성공');
        }
    });
};

module.exports = () => {
    connect();
    mongoose.connection.on('error', (err) => {
        console.log('private chat 연결 종료');
    });
    mongoose.connection.on('disconnected', (err) => {
        console.error('private chat 연결이 끊어졌습니다. 재접속 시도중');
        connect();
    });
    require('./chat');
    require('./profile')
};

// 몽고디비서버 실행 명령어: mongod --dbpath C:\Users\kimseoyoung\mongodb_data --auth