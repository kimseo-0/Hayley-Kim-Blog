const SocketIO = require('socket.io');
const axios = require('axios');
const cookieSignature = require('cookie-signature');

const parseCookies = (cookies = '') =>
    cookies
        .split(';')
        .map(v =>
            v.split('=')
        )
        .reduce((acc, [key, value]) => {
            acc[key.trim()] = decodeURIComponent(value);
            return acc;
        }, {});

module.exports = (server, app, sessionMiddleware) => {
    const io = SocketIO(server, {path : '/socket.io', cookie : false});
    app.set('io',io);
    io.use((socket, next) => {
        const cookies = socket.request.headers.cookie;
        //console.log(socket.request.headers);
        if (parseCookies(cookies)['userChecker'].substring(2) !== cookieSignature.sign(parseCookies(cookies)['userChecker']
            .split('.')[0]
            .substring(2), process.env.COOKIE_SECRET)) {
            return
            // 에러 출력할것
        }
        socket.request.signedCookies = {
            userChecker : parseCookies(cookies)['userChecker'].split('.')[0].substring(2)
        };
        next();
    });
    io.use((socket, next) => {
        sessionMiddleware(socket.request, socket.request.res, next);
    });

    io.of('/waitingRoom').on('connection', (socket) => {
        console.log('관리자가 waitingRoom에서 접속');
        socket.on('disconnect', () => {
            console.log('관리자가 waitingRoom에서 접속해제');
        })
    });

    io.of('/privateChatRoom').on('connection', (socket) => {
        console.log('클라이언트가 privateChatRoom에 접속');

        socket.on('disconnect', async (socket) => {
            console.log('클라이언트가 privateChatRoom에 접속해제');
        });

        socket.on('joinPrivateChatRoom', async (data) => {
            const {roomId} = data;
            console.log(roomId,'채팅룸으로 입장');
            socket.join(roomId);
        });
    });
};