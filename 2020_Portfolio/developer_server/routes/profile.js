const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn, isDeveloper, isNotDeveloper} = require('./middleware');
const Profile = require('../schemas/profile');

router.get('/loadProfile', isLoggedIn, isDeveloper, async (req,res,next) => {
    try {
        let profile = await Profile.findOne({});
        if (profile) {
            return res.json({profile: profile, info : ''});
        } else {
            await Profile.create({
                intro: '',
                careers: [],
                skills: []
            });
            profile = await Profile.findOne({});
            return res.json({profile : profile, info : ''});
        }
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

router.post('/addProfile', isLoggedIn, isDeveloper, async (req,res,next) => {
    try {
        const {type, data} = req.body;
        const profile = await Profile.findOne({});
        if (type === 'careers') {
            await Profile.update({
                _id: profile._id
            },{
                $push: {
                    careers: data
                }
            });
        } else if (type === 'skills') {
            await Profile.update({
                _id: profile._id
            },{
                $push: {
                    skills: data
                }
            });
        } else {
            res.json();
        }
        res.json();
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

router.post('/updateProfile', isLoggedIn, isDeveloper, async (req,res,next) => {
    try {
        const {type, index, data} = req.body;
        const profile = await Profile.findOne({});
        if (type === 'intro') {
            await Profile.update({
                _id: profile._id
            },{
                $set: {
                    intro: data
                }
            });
        } else if (type === 'careers') {
            await Profile.update({
                _id: profile._id,
                "careers.num" : profile.careers[index].num
            },{
                $set: {
                    "careers.$": data
                }
            });
        } else if (type === 'skills') {
            await Profile.update({
                _id: profile._id,
                "skills.num" : profile.skills[index].num
            },{
                $set: {
                    "skills.$": data
                }
            });
        } else {
            res.json();
        }
        res.json();
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

router.post('/deleteProfile', isLoggedIn, isDeveloper, async (req,res,next) => {
    try {
        const {type, data} = req.body;
        const profile = await Profile.find({});
        if (type === 'careers') {
            await Profile.update({
                _id: profile[0]._id
            },{
                $pull: {
                    careers: {name : data}
                }
            });
        } else if (type === 'skills') {
            await Profile.update({
                _id: profile[0]._id
            },{
                $pull: {
                    skills: {name : data}
                }
            });
        } else {
            res.json();
        }
        res.json();
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

module.exports = router;