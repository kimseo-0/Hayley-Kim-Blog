const express = require('express');
const router = express.Router();
const models = require('../models/index');
const { isLoggedIn, isNotLoggedIn, isDeveloper} = require('./middleware');

router.get('/loadContacts', isLoggedIn, isDeveloper, async (req, res, next) => {
    try {
        const contacts = await models.Contact.findAll({});
        return res.json({contacts})
    } catch (e) {
        console.error(e);
    }
});

router.post('/updateUserState', isLoggedIn, isDeveloper, async (req, res, next) => {
    try {
        const {id, state} = req.body;
        await models.Contact.update({
            state : !state
        },{
            where: {id}
        });
        res.json({info: 'updateUserState success'})
    } catch (e) {
        console.log(e);
    }
});

router.post('/deleteContact', isLoggedIn, isDeveloper, async (req, res, next) => {
    try {
        const {contactId} = req.body;

        await models.Contact.destroy({
            where: {id: contactId}
        });

        return res.json({info : 'success deleteContact'})
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;