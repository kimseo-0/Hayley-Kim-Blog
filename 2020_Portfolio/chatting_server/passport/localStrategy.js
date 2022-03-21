const localStrategy = require('passport-local').Strategy;
const models = require('../models/index');
//const bcrypt = require('bcrypt');

module.exports = (passport) => {
    passport.use(new localStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            let user = await models.User.findOne({
                where : {email}
            });
            if (!user) {
                return done(null, false, {message:"this email does not exist"});
            }
            let resultOfPasswordCheck = (password === user.hashedPassword);
            if (!resultOfPasswordCheck) {
                return done(null, false, {message: "password dose not correct"});
            }
            if (!user.state) {
                return done(null, false, {message: "사용이 정지된 계정입니다"});
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
                    }],
                    order: [['createdAt', 'DESC']]
                },{
                    model: models.Room,
                    as: 'UserRooms',
                    through: {

                    }
                }]
            });
            return done(null, user);
        } catch(e) {
                console.log(e);
                return done(e);
        }
    }))
};