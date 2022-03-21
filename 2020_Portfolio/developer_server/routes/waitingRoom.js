const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn, isDeveloper, isNotDeveloper} = require('./middleware');
const models = require('../models/index');
const Chat = require('../schemas/chat');
const Profile = require('../schemas/profile');

router.get('/loadRooms', isLoggedIn, isDeveloper, async (req, res, next) => {
    try {
        let allRoom = await models.Room.findAll({
            include: [{
                model: models.User,
                as: 'Participants',
                through: {

                }
            }]
        });

        let rooms = [];
        for (let room of allRoom) {
            const lastChat = await Chat.findOne(
                {
                roomId : room.id
                }
            )
            .sort({'_id' : -1})
            .limit(1);

            let newChat;
            if (room.managerAt) {
                newChat = await Chat.find(
                    {
                        roomId : room.id,
                        createdAt: { $gt: (room.managerAt).toISOString() }
                    }
                )
                    .sort({'_id' : -1});
            } else {
                newChat = []
            }


            rooms.push({'room': room, 'lastChat' : lastChat, 'newChatNum' : newChat.length});
        }

        return res.json({
            rooms :  rooms.reverse(),
            info : 'loadRooms success'
        });
    } catch (e) {
        console.error(e);
        next(e)
    }
});

router.post('/loadSingleRoom', isLoggedIn, isDeveloper, async (req,res,next) => {
    try {
        const {roomId} = req.body;
        const room = await models.Room.findOne({
            where : {
                id : roomId
            }
        });

        // 방 존재 여부
        if (!room) {
            return res.json({info : 'this room dose not exist'});
        }

        await models.Room.update({
            managerAt : new Date(),
        },{
            where: {
                id: roomId
            }
        });

        const chats = await Chat.find({
            roomId
        });

        const other = await models.User.findOne({
            where : {id : roomId}
        });

        return res.json({
            room,
            chats,
            other,
            info : "loadSingleRoom success"
        });

    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;