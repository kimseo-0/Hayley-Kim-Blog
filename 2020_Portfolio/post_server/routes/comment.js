const express = require('express');
const path = require('path');
const router = express.Router();
const models = require('../models/index');
const { isLoggedIn, isNotLoggedIn, isDeveloper} = require('./middleware');

router.post('/addComment', isLoggedIn, async (req, res, next) => {
    try {
        const { text, postId } = req.body;

        await models.Comment.create({
            userId : req.user.id,
            postId : postId,
            text : text
        });
        const comments = await models.Comment.findAll({
            where : {
                postId : postId,
                state: true,
            },
            include : [{
                model : models.User,
                attributes: ['id', 'nickName', 'email', 'avatarImageUrl']
            }],
            order : [['createdAt','DESC']]
        });
        return res.json({
            comments : comments,
            info : 'addComment success'
        });
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.post('/updateComment', isLoggedIn, async (req, res, next) => {
    try {
        const { text, commentId, commentUserId } = req.body;
        if (commentUserId !== req.user.id) {
            return res.json({info : 'not available'})
        }
        await models.Comment.update({
            text : text
        },{
            where : {id : commentId}
        });
        const comment = await models.Comment.findOne({
            where : { id : commentId},
            include : [{
                model : models.User,
                attributes : ['id', 'email', 'nickName', 'avatarImageUrl']
            }],
        });
        return res.json({comment, info : 'updateComment success'})
    } catch (e) {
        console.error(e)
    }
});

router.post('/deleteComment', isLoggedIn, async (req, res, next) => {
    try {
        const {commentId, commentUserId} = req.body;
        if (commentUserId !== req.user.id) {
            return res.json({info : 'not available'})
        }
        await models.Comment.destroy({
            where : {id : commentId}
        });
        return res.json({info : 'deleteComment success'});
    } catch (e) {
        console.error(e);
    }
});

router.post('/reportComment', async (req, res, next) => {
    try {
        const { commentId, text } = req.body;
        await models.Report.create({
            userId: req.user.id,
            commentId: commentId,
            text
        });
        return res.json({info : 'reportComment success'});
    } catch (e) {
        console.error(e);
    }
});

module.exports = router;