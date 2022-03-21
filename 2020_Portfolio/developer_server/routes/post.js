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

//관리자만
router.get('/loadAllPosts', isLoggedIn, isDeveloper, async (req,res,next) => {
    try {
        let posts = await models.Post.findAll({
            include : [{
                model : models.User,
                attributes : ['id', 'email', 'nickName','avatarImageUrl']
            },{
                model : models.Image
            },{
                model : models.Comment,
                separate : true,
                include : [{
                    model : models.User,
                    attributes : ['id', 'email', 'nickName','avatarImageUrl']
                },{
                    model : models.Report,
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

        const hashTags = await models.HashTag.findAll({
        });

        return res.json({posts, hashTags});
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

router.post('/uploadImages', isLoggedIn, isDeveloper, upload.array('images', 10), (req, res, next) => {
    return res.json({ imageUrls : req.files.map((file) => {
        return `public/images/${file.filename}`
        })
    });
});

router.post('/deleteImage', isLoggedIn, isDeveloper, (req, res, next) => {
    const {imageUrl} = req.body;
    const trueImageUrl = `open/${imageUrl.substring(7)}`;
    fs.unlink(trueImageUrl,(err) => {
        if(err) {
            console.error(err)
        }
    });
    return res.send();
});

router.post('/uploadPost', isLoggedIn, isDeveloper, upload.none(), async (req,res,next) => {
    let {startTime, endTime, gitHubLink, title, summary, imageUrls, hashTags, contentHtml, contentMarkDown } = req.body;
    try {
        let post = await models.Post.create({
            startTime,
            endTime,
            gitHubLink,
            title,
            summary,
            contentHtml,
            contentMarkDown,
            userId : req.user.id
        });

        const allHashTags = await models.HashTag.findAll();
        let allHashTagNames = [];
        allHashTags.forEach((hashTag) => {
           allHashTagNames.push(hashTag.tagName);
        });

        for (let tagName of hashTags) {
            let hashTag;
             if (allHashTagNames.indexOf(tagName) === -1) {
                 hashTag = await models.HashTag.create({
                     tagName
                 });
             } else {
                 hashTag = await models.HashTag.findOne({
                     where : {tagName}
                 })
             }
             await post.addPostHashTag(hashTag, { through: { status: 'started' }});
        }

        const postId = post.id;
        if (imageUrls.length !== 0) {
            for (const imageUrl of imageUrls) {
                await models.Image.create({
                    imageUrl,
                    postId: postId
                });
            }
        }

        post = await models.Post.findOne({
            where: {
                id: postId
            },
            include : [{
                model : models.User,
                attributes : ['id', 'email', 'nickName']
            },{
                model : models.Image
            },{
                model : models.Comment,
                include : [{
                    model : models.User
                },{
                    model : models.Report,
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
            }]
        });

        return res.json({post});
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.post('/updatePost', isLoggedIn, isDeveloper, upload.none(), async (req,res,next) => {
    const { postId, startTime, endTime, gitHubLink, title, summary, imageUrls, deleteImageUrls, hashTags, deleteHashTags, contentHtml, contentMarkDown } = req.body;
    try {
        let post = await models.Post.findOne({
            where: {id: postId}
        });
        await models.Post.update({
            startTime,
            endTime,
            gitHubLink,
            title,
            summary,
            contentHtml,
            contentMarkDown
        },{
           where : {id : postId}
        });

        if (imageUrls.length !== 0) {
            for (const imageUrl of imageUrls) {
                await models.Image.create({
                    imageUrl,
                    postId
                });
            }
        }

        if (deleteImageUrls.length !== 0) {
            for (const imageUrl of deleteImageUrls) {
                await models.Image.destroy({
                    where: {imageUrl}
                });
            }
        }

        const allHashTags = await models.HashTag.findAll({
            include : [{
                model : models.Post,
                as : 'HashTagPosts',
                through: {
                }
            },]
        });

        let allHashTagNames = [];
        allHashTags.forEach((hashTag) => {
            allHashTagNames.push(hashTag.tagName);
        });

        if (hashTags.length !== 0) {
            for (let tagName of hashTags) {
                let hashTag;
                if (allHashTagNames.indexOf(tagName) === -1) {
                    hashTag = await models.HashTag.create({
                        tagName
                    });
                } else {
                    hashTag = await models.HashTag.findOne({
                        where : {tagName}
                    })
                }
                await post.addPostHashTag(hashTag, { through: { status: 'started' }});
            }
        }

        if (deleteHashTags.length !== 0) {
            for (const tagName of deleteHashTags) {
                let hashTag;
                hashTag = await models.HashTag.findOne({
                    where : {tagName}
                });
                const index = allHashTagNames.indexOf(tagName);
                if (index !== -1 && allHashTags[index].HashTagPosts.length === 1) {
                    await models.HashTag.destroy({
                        where : { id: hashTag.id}
                    });
                } else {
                    await post.removePostHashTags(hashTag);
                }
            }
        }

        post = await models.Post.findOne({
            where: {
                id: postId
            },
            include : [{
                model : models.User,
                attributes : ['id', 'email', 'nickName']
            },{
                model : models.Image
            },{
                model : models.Comment,
                include : [{
                    model : models.User
                },{
                    model : models.Report,
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
            }]
        });
        return res.json({post});
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.post('/updatePostState', isLoggedIn, isDeveloper, async (req, res, next) => {
    try {
        const {postId, state} = req.body;
        await models.Post.update({
            state : !state
        },{
            where : {id : postId}
        });
        return res.json({});
    } catch (e) {
        console.error(e);
    }
});

router.post('/deletePost', isLoggedIn, isDeveloper, async (req, res, next) => {
    try {
        const {post} = req.body;

        // 1:N -> comment image
        // N:M -> hashTag, user
        // hashTag
        const allHashTags = await   models.HashTag.findAll({
            include : [{
                model : models.Post,
                as : 'HashTagPosts',
                through: {
                    attributes: ['id']
                }
            },]
        });

        let allHashTagNames = [];
        allHashTags.forEach((hashTag) => {
            allHashTagNames.push(hashTag.tagName);
        });

        if (post.PostHashTags.length !== 0) {
            for (const hashTag of post.PostHashTags) {
                const index = allHashTagNames.indexOf(hashTag.tagName);
                if (index !== -1 && allHashTags[index].HashTagPosts.length === 1) {
                    await models.HashTag.destroy({
                        where : { id: hashTag.id}
                    })
                }
            }
        }

        await models.Post.destroy({
            where : {id : post.id}
        });

        return res.json({info : 'deletePost success'})
    } catch (e) {
        console.error(e);
    }
});

module.exports = router;