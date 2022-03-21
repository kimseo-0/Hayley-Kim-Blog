const express = require('express');
const path = require('path');
const router = express.Router();
const models = require('../models/index');
const { isLoggedIn, isNotLoggedIn, isDeveloper} = require('./middleware');

router.get('/loadReports', isLoggedIn, isDeveloper, async (req,res,next) => {
    try {
        const reports = await models.Report.findAll({
            include: [{
                model: models.User,
            }, {
                model: models.Comment,
            }]
        });
        console.log(reports);
        return res.json({reports, info : ''});
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

router.post('/deleteComment', isLoggedIn, isDeveloper, async (req, res, next) => {
    try {
        const {commentId} = req.body;
        await models.Comment.destroy({
            where : {id : commentId}
        });
        return res.json({info : ''});
    } catch (e) {
        console.error(e);
    }
});

router.post('/updateCommentState', isLoggedIn, isDeveloper, async (req, res, next) => {
    try {
        const {commentId, state} = req.body;
        await models.Comment.update({
            state : !state
        },{
            where : {id : commentId}
        });
        return res.json({});
    } catch (e) {
        console.error(e);
    }
});

module.exports = router;