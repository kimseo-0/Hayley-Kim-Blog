module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
        text : {
                type : DataTypes.TEXT,
            allowNull : false
        },
        state : {
            type : DataTypes.BOOLEAN,
            allowNull : false,
            defaultValue : true
        }
    }, {
        timestamps : true,
        paranoid : true,
        underscored : false,
        charset : 'utf8mb4',
        collate : 'utf8mb4_general_ci',
    });
    Comment.associate = (models) => {
        models.Comment.hasMany(models.Report, {onDelete: 'CASCADE', foreignKey: 'commentId', sourceKey: 'id'});

        models.Comment.belongsTo(models.User, {onDelete: 'CASCADE', foreignKey: 'userId', targetKey: 'id'});
        models.Comment.belongsTo(models.Post, {onDelete: 'CASCADE', foreignKey: 'postId', targetKey: 'id'});
    };
    return Comment;
};