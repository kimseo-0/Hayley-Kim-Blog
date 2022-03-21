const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const models = require('../models/index');
const Chat = require('../schemas/chat');
const {isLoggedIn} = require('./middleware');

fs.readdir('open/privateChatImages', (err) => {
    if(err) {
        console.log('open/privateChatImages 폴더가 존재하지 않습니다. 폴더를 생성합니다.');
        fs.mkdirSync('open/privateChatImages');
    }
});

let storage = multer.diskStorage({
    destination: function(req, file ,callback){
        callback(null, "open/privateChatImages")
    },
    filename: function(req, file, callback){
        const ext = path.extname(file.originalname);
        callback(null, path.basename(file.originalname,ext) + "_" + Date.now() + ext)
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize:   20*1024*1024}
});

router.post('/uploadChatImage', isLoggedIn, upload.array('images',  10), (req, res, next) => {
    return res.json({imageUrls : req.files.map((file) => {
        return `public/privateChatImages/${file.filename}`
        })
    });
});

router.post('/deleteChatImage', isLoggedIn, (req, res, next) => {
    const {imageUrl} = req.body;
    const trueImageUrl = `open/${imageUrl.substring(7)}`;
    fs.unlink(trueImageUrl,(err) => {
        if(err) {
            console.error(err)
        }
    });
    return res.send();
});

router.post('/addChat', isLoggedIn, async (req, res, next) => {
    try {
        let {roomId, imageUrls, message} = req.body;
        let chats = [];
        if (imageUrls.length !== 0) {
            for (const imageUrl of imageUrls) {
                const chat = await Chat.create({
                    roomId,
                    userId : req.user.id,
                    nickName : req.user.nickName,
                    imageUrl
                });
                chats.push(chat);
            }
        }
        if (message) {
            const chat = await Chat.create({
                roomId,
                userId : req.user.id,
                nickName : req.user.nickName,
                message
            });
            chats.push(chat);
        }

        const io = req.app.get('io');
        io.of('/privateChatRoom').to(roomId).emit('chat', {
           chats
        });
        io.of('/waitingRoom').emit('updateLastChat', {
            chat : chats[chats.length -1],
            chatNum : chats.length,
            roomId : roomId
        });

        await models.Room.update({
            userAT : new Date(),
        },{
            where: {
                id: roomId
            }
        });

        res.json({info:'addChat success'});
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/updateRoom', isLoggedIn, async (req, res, next) => {
    try {
        const {roomId, type} = req.body;
        if (type === "manager") {
            await models.Room.update({
                managerAt : new Date(),
            },{
                where: {
                    id: roomId
                }
            });
        } else if (type === "user") {
            await models.Room.update({
                userAt : new Date(),
            },{
                where: {
                    id: roomId
                }
            });
        }
        res.json({info: 'updateRoom success'})
    } catch (e) {
        console.error(e)
    }
});

module.exports = router;