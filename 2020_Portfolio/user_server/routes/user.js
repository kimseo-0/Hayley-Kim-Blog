const express = require('express');
const fs = require('fs');
const multer = require("multer");
const path = require('path');
const router = express.Router();
const passport = require('passport');
//const bcrypt = require('bcrypt');
const models = require('../models/index');
const Profile = require('../schemas/profile');
const {isLoggedIn, isNotLoggedIn, isDeveloper} = require('./middleware');

fs.readdir('open/avatarImages', (err) => {
    if (err) {
        console.log('open/avatarImages 폴더가 존재하지 않습니다. 폴더를 생성합니다.');
        fs.mkdirSync('open/avatarImages');
    }
});

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "open/avatarImages")
    },
    filename: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        callback(null, path.basename(file.originalname, ext) + "_" + Date.now() + ext)
    }
});

let upload = multer({
    storage: storage,
    limits: {fileSize: 20 * 1024 * 1024}
});

router.get('/loadProfile', async (req,res,next) => {
    try {
        const profile = await Profile.findOne({});

        return res.json({profile: profile, info : 'loadProfile success'});
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/signUp', isNotLoggedIn, async (req, res, next) => {
    try {
        const {email, nickName, password} = req.body;
        // find user from userDB
        let user = await models.User.findOne({
            where: {email}
        });
        // check duplicated user
        // if user is duplicated, return info = 'this email is a duplicate'
        if (user) {
            return res.json({info: 'this email is a duplicate'})
        }
        // check duplicated nickName
        user = await models.User.findOne({
            where: {nickName}
        });
        if (user) {
            return res.json({info: 'this nickName is a duplicate'})
        }
        // hashed password
        const hashedPassword = password;

        // room 생성
        const room = await models.Room.create({});

        // create user to userDB
        user = await models.User.create({
            email, hashedPassword, nickName,
        });

        room.addParticipants(user, { through: { status: 'started' }});

        // find new user from userDB
        user = await models.User.findOne({
            where: {email},
            attribute: ['id', 'email', 'nickName', 'avatarImageUrl']
        });

        // login just after success create user
        req.login(user, (err) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            return res.json({user, info: "signUp success"});
        });
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', {}, (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (info) {
            console.error(info.message);
            return res.json({user: null, info: info.message});
        }
        req.login(user, async (err) => {
            if (err) {
                console.error(err);
                return next(err);
            }

            return res.json({user, info: "login success"});
        });
    })(req, res, next);
});

router.get('/logout', async (req, res, next) => {
    try {
        req.logout();
        req.session.destroy();
        return res.json({info: "logout success"})
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

router.get('/loadMe', isLoggedIn, async (req, res, next) => {
    try {
        res.json({
            user: req.user,
            info: 'isLoggedIn'
        });
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/uploadPreviewAvatarImages', isLoggedIn, upload.single('images'), (req, res, next) => {
    return res.json({imageUrl: `public/avatarImages/${req.file.filename}`});
});

router.post('/deletePreviewAvatarImage', isLoggedIn, (req, res, next) => {
    const {imageUrl} = req.body;
    const trueImageUrl = `open/${imageUrl.substring(7)}`;
    fs.unlink(trueImageUrl, (err) => {
        if (err) {
            console.error(err)
        }
    });
    return res.send();
});

router.post('/updateProfile', isLoggedIn, async (req, res, next) => {
    try {
        const {email, nickName, avatarImageUrl, currentPassword, password} = req.body;
        // find user
        let user = req.user;
        // no change
        if (nickName === user.nickName && password === "" && avatarImageUrl === user.avatarImageUrl) {
            return res.json({info: 'no change'});
        }
        // check password
        const userPassword = user.hashedPassword;
        if (currentPassword !== userPassword) {
            return res.json({info: 'currentPassword is not correct'});
        }
        // check duplicated nickName
        const other = await models.User.findOne({
            where: {nickName}
        });
        // 본인이 아닌 유저가 존재할 경우
        if (other) {
            return res.json({info: 'this nickName is a duplicate'})
        }

        if (password === "") {
            await models.User.update({
                nickName: nickName,
                avatarImageUrl: avatarImageUrl,
            }, {
                where: {email: email}
            });
        } else {
            const hashedPassword = password;
            await models.User.update({
                nickName: nickName,
                avatarImageUrl: avatarImageUrl,
                hashedPassword: hashedPassword,
            }, {
                where: {email: email}
            });
        }

        user = await models.User.findOne({
            where: {email: email},
            attributes: ['id', 'email', 'nickName','avatarImageUrl','state'],
            include: [{
                model: models.Post,
                as: 'UserLikePosts',
                through: {
                    attributes: [],
                },
                include: [{
                    model: models.User,
                    attributes: ['id', 'email', 'nickName']
                }, {
                    model: models.Image
                },{
                    model: models.Comment
                }, {
                    model: models.HashTag,
                    as: 'PostHashTags',
                    through: {

                    }
                },{
                    model : models.User,
                    as : 'PostLikeUsers',
                    through: {

                    }
                },{
                    model: models.Room,
                    as: 'UserRoom',
                    through: {

                    }
                }],
                order: [['createdAt', 'DESC']]
            }]
        });
        return res.json({user, info: 'updateProfile success'})
    } catch (e) {
        console.error(e);
        next(e);
    }
});

// comment 삭제
router.post('/deleteProfile', isLoggedIn, async (req, res, next) => {
    try {
        // 1:N -> comment
        await models.User.destroy({
            where: {id: req.user.id}
        });
        // n:m -> Room
        const user = req.user;
        const room = req.user.UserRoom;
        await user.removeUserRooms(room);

        req.session.destroy();
        res.json({info: 'deleteProfile success'})
    } catch (e) {
        console.log(e);
        next(e);
    }
});

module.exports = router;