const models = require('../models/index');

let isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    } else {
        return res.json({info : 'isNotLoggedIn'});
    }
};

let isNotLoggedIn  = (req, res, next) => {
    if(!req.isAuthenticated()) {
        return next();
    } else {
        return res.json({info : 'isLoggedIn'});
    }
};

let isDeveloper = (req, res, next) => {
    if(req.user.id === 1) {
        return next();
    } else {
        return res.json({info : 'isNotManager'})
    }
};

let isNotDeveloper = (req, res, next) => {
    if(req.user.id !== 1) {
        return next();
    } else {
        return res.json({info : 'isManager'})
    }
};

module.exports = {
    isLoggedIn,
    isNotLoggedIn,
    isDeveloper,
    isNotDeveloper
};