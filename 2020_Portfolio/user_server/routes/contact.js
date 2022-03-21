const express = require('express');
const router = express.Router();
const models = require('../models/index');
const { isLoggedIn, isNotLoggedIn, isDeveloper} = require('./middleware');

router.post('/addContact', async (req, res, next) => {
   try {
       const {email, name, content} = req.body;

       await models.Contact.create({
           email, name, content
       });

       return res.json({info : 'addContact success'})
   } catch (e) {
       console.log(e);
       next(e);
   }
});

module.exports = router;