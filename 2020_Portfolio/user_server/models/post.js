module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
        startTime : {
            type : DataTypes.STRING(20),
            allowNull : true,
        },
        endTime : {
            type : DataTypes.STRING(20),
            allowNull : true,
        },
        gitHubLink : {
            type : DataTypes.STRING(500),
            allowNull : true,
        },
        title : {
            type : DataTypes.STRING(20),
            allowNull : false,
        },
        summary : {
            type : DataTypes.STRING(200),
            allowNull : false,
        },
        contentHtml : {
            type : DataTypes.TEXT,
            allowNull : false,
        },
        contentMarkDown : {
            type : DataTypes.TEXT,
            allowNull : false,
        },
        state : {
            type : DataTypes.TEXT,
            allowNull : false,
            defaultValue : false
        }
    }, {
        timestamps : true,
        paranoid : true,
        underscored : false,
        charset : 'utf8mb4',
        collate : 'utf8mb4_general_ci',
    });
    Post.associate = (models) => {
        models.Post.belongsTo(models.User, {onDelete: 'CASCADE', foreignKey: 'userId', targetKey: 'id'});
        models.Post.hasMany(models.Comment, {onDelete: 'CASCADE', foreignKey: 'postId', sourceKey: 'id'});
        models.Post.hasMany(models.Image, {onDelete: 'CASCADE', foreignKey: 'postId', sourceKey: 'id'});
        models.Post.belongsToMany(models.HashTag,  {
            as : 'PostHashTags',
            through: 'PostAndHashTag',
            foreignKey: 'postId',
            sourceKey: 'id'
        });
        models.Post.belongsToMany(models.User,  {
            as : 'PostLikeUsers',
            through: 'UserAndPost',
            foreignKey: 'postId',
            sourceKey: 'id'
        });
    };
    return Post;
};