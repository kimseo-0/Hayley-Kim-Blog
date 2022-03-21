const express = require('express');
const fs = require('fs');
const multer = require("multer");
const path = require('path');
const router = express.Router();
const models = require('../models/index');
const {Sequelize} = models;
const { isLoggedIn, isNotLoggedIn, isDeveloper} = require('./middleware');

fs.readdir('open/images', (err) => {
    if(err) {
        console.log('open/images 폴더가 존재하지 않습니다. 폴더를 생성합니다.');
        fs.mkdirSync('open/images');
    }
});

let storage = multer.diskStorage({
        destination: function(req, file ,callback){
            callback(null, "open/images")
        },
        filename: function(req, file, callback){
            const ext = path.extname(file.originalname);
            callback(null, path.basename(file.originalname,ext) + "_" + Date.now() + ext)
        }
});

let upload = multer({
    storage: storage,
    limits: {fileSize: 20*1024*1024}
});

router.get('/loadPosts', async (req, res, next) => {
    try {
        const posts = await models.Post.findAll({
            where : {state: true},
            include : [{
                model : models.User,
                attributes : ['id', 'email', 'nickName','avatarImageUrl']
            },{
                model : models.Image
            },{
                model : models.Comment,
                separate: true,
                where: {state: true},
                include : [{
                    model : models.User,
                    attributes : ['id', 'email', 'nickName', 'avatarImageUrl']
                }]
            },{
                model : models.HashTag,
                as : 'PostHashTags',
                through: {
                }
            },{
                model : models.User,
                as : 'PostLikeUsers',
                through: {
                }
            }],
            order : [['createdAt','DESC']]
        });

        const hashTags = await models.HashTag.findAll({
        });

        return res.json({posts, hashTags, info: 'loadPosts success'});
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

router.post('/searchPost', async (req, res, next) => {
    try {
        let {text} = req.body;

        const posts = await models.Post.findAll({
            where : {
                [Sequelize.Op.or]: [
                    {
                    title : {
                        [Sequelize.Op.like]: "%" + text + "%"
                        }
                    },
                    {
                        summary : {
                            [Sequelize.Op.like]: "%" + text + "%"
                        }
                    }
                ],
                state : true
            },
            include : [{
                model : models.User,
                attributes : ['id', 'email', 'nickName']
            },{
                model : models.Image
            },{
                model : models.Comment,
                where:{state: true},
                separate: true,
                include : [{
                    model : models.User
                }],
            },{
                model : models.HashTag,
                as : 'PostHashTags',
                through: {
                     
                }
            },{
                model : models.User,
                as : 'PostLikeUsers',
                through: {
                   
                }
            }],
            order : [['createdAt','DESC']]
        });

        if (posts.length === 0) {
            return res.json({posts , info : 'no search result'});
        }
        return res.json({posts, info : 'searchHashTag success'});
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

router.post('/searchHashTag', async (req,res,next) => {
    try {
        let {hashTagName} = req.body;
        const theHashTag = await models.HashTag.findOne({
            where : {
                tagName : hashTagName
            }
        });

        const posts = await theHashTag.getHashTagPosts({
            where : {
                state : true
            },
            include : [{
                model : models.User,
                attributes : ['id', 'email', 'nickName']
            },{
                model : models.Image
            },{
                model : models.Comment,
                separate: true,
                where: {state: true},
                include : [{
                    model : models.User
                }],
            },{
                model : models.HashTag,
                as : 'PostHashTags',
                through: {
                    
                }
            },{
                model : models.User,
                as : 'PostLikeUsers',
                through: {
                    
                }
            }],
            order : [['createdAt','DESC']]
        });

        if (posts.length === 0) {
            return res.json({posts , info : 'no search result'});
        }

        return res.json({posts, info : 'searchHashTag success'});
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

//single post
router.get('/loadSinglePost/:postId', async (req, res, next) => {
    const {postId} = req.params;
    const post = await models.Post.findOne({
        where : {id : postId},
        include : [{
            model : models.User,
            attributes : ['id', 'email', 'nickName']
        },{
            model : models.Image
        },{
            model : models.HashTag,
            as : 'PostHashTags',
            through: {
                 
            }
        },{
            model : models.User,
            as : 'PostLikeUsers',
            through: {
              
            }
        },{
            model : models.Comment,
            separate: true,
            where: {state:true},
            include : [{
                model : models.User,
                attributes : ['id', 'email', 'nickName', 'avatarImageUrl']
            }],
            order : [['createdAt','DESC']]
        }]
    });

    if (!post) {
        return res.json({post: null, comments: null, info: 'no singlePost'});
    }

    const comments = await models.Comment.findAll({
        where : {
            postId : postId,
            state: true,
        },
        include : [{
            model : models.User,
            attributes : ['id', 'email', 'nickName', 'avatarImageUrl']
        }],
        order : [['createdAt','DESC']]
    });

    return res.json({post, comments, info: 'loadSinglePost success'});
});

router.post('/addLikePost', isLoggedIn, async (req, res, next) => {
    const {postId} = req.body;
    const user = await models.User.findOne({
        where : {id : req.user.id}
    });
    const post = await models.Post.findOne({
        where : {id : postId}
    });
    await user.addUserLikePost(post, { through: { status: 'started' }});
    res.json({info: 'addLikePost success'});
});

router.post('/deleteLikePost', isLoggedIn, async (req, res, next) => {
    const {postId} = req.body;
    const user = await models.User.findOne({
        where : {id : req.user.id}
    });
    const post = await models.Post.findOne({
        where : {id : postId}
    });
    await user.removeUserLikePost(post);
    res.json({info: 'deleteLikePost success'});
});


module.exports = router;