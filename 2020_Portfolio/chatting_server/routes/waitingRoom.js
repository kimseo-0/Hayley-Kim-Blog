const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn, isDeveloper, isNotDeveloper} = require('./middleware');
const models = require('../models/index');
const Chat = require('../schemas/chat');

router.get('/loadRoom', isLoggedIn, isNotDeveloper, async (req, res, next) => {
    try{
        const io = req.app.get('io');

        // 관리자 정보
        const other = await models.User.findOne({
            where: {id: 1},
            attributes: ['id', 'email', 'nickName','avatarImageUrl'],
        });

        const room = req.user.UserRooms[0];

        const chats = await Chat.find({
            roomId : room.id
        });

        if (chats.length !== 0) {
            const newChat = await Chat.find(
                {
                    roomId : room.id,
                    createdAt: { $gt: (room.userAt).toISOString() }
                }
            )
            .sort({'_id' : -1});

            console.log(newChat);
            return res.json({
                chats,
                other,
                newChatNum: newChat.length,
                info : 'loadRoom success: old user'
            });
        } else {
            await models.Room.update({
                userAt : new Date(),
                managerAt : new Date()
            },{
                where: {
                    id : room.id
                }
            });

            // 관리자에 계정에 유저 추가 소켓
            await io.of('/waitingRoom').emit('addChatRoom', {
                room
            });

            // 시스템 메세지 생성 저장
            const chat1 = await Chat.create({
                roomId : room.id,
                userId : other.id,
                nickName: other.nickName,
                message: `hello!`
            });
            const chat2 = await Chat.create({
                roomId : room.id,
                userId : other.id,
                nickName: other.nickName,
                message: `Do you have any question?`
            });

            await models.Room.update({
                managerAt : new Date(),
            },{
                where: {
                    id : room.id
                }
            });

            // 시스템 메세지 소켓 전송
            setTimeout(() => {
                io.of('/privateChatRoom').to(req.user.id).emit('chat',{
                    chats : [chat1]
                });
                io.of('/waitingRoom').emit('updateLastChat', {
                    chat : chat1,
                    chatNum : 0,
                    roomId : req.user.id
                });
            },1000);

            setTimeout(() => {
                io.of('/privateChatRoom').to(req.user.id).emit('chat',{
                    chats : [chat2]
                });
                io.of('/waitingRoom').emit('updateLastChat', {
                    chat : chat2,
                    chatNum : 0,
                    roomId : req.user.id
                });
            },2000);

            return res.json({
                chats : [],
                other,
                newChatNum: 0,
                info : 'loadRoom success: new user'
            });
        }
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;