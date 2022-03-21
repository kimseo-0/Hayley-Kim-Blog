const express = require('express');
const fs = require('fs');
const multer = require("multer");
const path = require('path');
const router = express.Router();
const passport = require('passport');
//const bcrypt = require('bcrypt');
const models = require('../models/index');
const {isLoggedIn, isNotLoggedIn, isDeveloper} = require('./middleware');

router.post('/developerLogin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', {}, (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (info) {
            console.error(info.message);
            return res.json({user: null, info: info.message});
        }
        if (user.id === 1) {
            req.login(user, async (err) => {
                if (err) {
                    console.error(err);
                    return next(err);
                }

                return res.json({user, info: "developerLogin success"});
            });
        } else {
            return res.json({user: null, info: "isNotDeveloper"});
        }
    })(req, res, next);
});

router.get('/checkDeveloper', isLoggedIn, isDeveloper, async (req, res, next) => {
    try {
        res.json({
            user: req.user,
            info: 'isDeveloper'
        });
    } catch (e) {
        console.error(e)
    }
});

router.get('/loadUsers', isLoggedIn, isDeveloper, async (req, res, next) => {
    try {
        let users = await models.User.findAll({
            where: {},
            attributes: ['id', 'email', 'nickName','avatarImageUrl','state'],
            include: [{
                model: models.Post,
                as: 'UserLikePosts',
                through: {
                    attributes: [],
                },
                order: [['createdAt', 'DESC']]
            },{
                model: models.Comment,
                include : [{
                    model : models.User
                },{
                    model : models.Report,
                }],
            },{
                model: models.Report
            }]
        });

        users = users.slice(1, users.length);

        return res.json({users});
    } catch (e) {
        console.error(e)
    }
});

router.post('/updateUserState', isLoggedIn, isDeveloper, async (req, res, next) => {
    try {
        const {id, state} = req.body;
        await models.User.update({
            state : !state
        },{
            where: {id}
        });
        res.json({info: 'updateUserState success'})
    } catch (e) {
        console.log(e);
    }
});

router.post('/deleteUser', isLoggedIn, isDeveloper, async (req, res, next) => {
    try {
        const {userId} = req.body;
        await models.User.destroy({
            where : {id : userId}
        });
        return res.json({info : ''});
    } catch (e) {
        console.error(e);
    }
});

module.exports = router;