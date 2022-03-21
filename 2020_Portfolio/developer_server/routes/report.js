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
        return res.json({reports, info : ''});
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

module.exports = router;