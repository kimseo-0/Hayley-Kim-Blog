const localStrategy = require('./localStrategy');
const models = require('../models/index');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        return done(null, user.email);
    });
    passport.deserializeUser(async (email, done) => {
        try {
            let user = await models.User.findOne({
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
            if(!user) {
                console.error('deserialize 데이터가 존재하지 않습니다.');
                return done(null, false, {message: '데이터가 존재하지 않습니다.'});
            }
            if (!user.state) {
                return done(null, false, {message: "사용이 정지된 계정입니다"});
            }
            return done(null, user);
        } catch (e) {
            console.error(e);
            return done(e);
        }
    });
    localStrategy(passport);
};