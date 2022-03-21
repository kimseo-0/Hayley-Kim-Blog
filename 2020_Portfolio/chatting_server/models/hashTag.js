module.exports = (sequelize, DataTypes) => {
    const HashTag = sequelize.define("HashTag", {
        tagName : {
            type : DataTypes.STRING(20),
            allowNull : true,
            unique: true
        }
    }, {
        timestamps : true,
        paranoid : false,
        underscored : false,
        charset : 'utf8mb4',
        collate : 'utf8mb4_general_ci',
    });
    HashTag.associate = (models) => {
        //models.HashTag.belongsToMany(models.User, { through: 'UserAndHashTag' });
        models.HashTag.belongsToMany(models.Post, {
            as : 'HashTagPosts',
            through: 'PostAndHashTag',
            foreignKey: 'hashTagId',
            sourceKey: 'id'});
    };

    return HashTag;
};