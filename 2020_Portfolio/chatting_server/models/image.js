module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("Image", {
        imageUrl : {
            type : DataTypes.STRING(500),
            allowNull : false
        }
    }, {
        timestamps : true,
        paranoid : false,
        underscored : false,
        charset : 'utf8mb4',
        collate : 'utf8mb4_general_ci',
    });
    Image.associate = (models) => {
        models.Image.belongsTo(models.Post, {onDelete: 'CASCADE', foreignKey: 'postId', sourceKey: 'id'});
    };
    return Image;
};