module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        },
        hashedPassword: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: false
        },
        nickName: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
            defaultValue: '익명'
        },
        avatarImageUrl: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: 'public/avatarImages/avatar_default.png'
        },
        provider: {
            type: DataTypes.STRING(30),
            allowNull: true,
            defaultValue: 'local'
        },
        state : {
            type : DataTypes.BOOLEAN,
            allowNull : false,
            defaultValue : true,
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    });
    User.associate = (models) => {
        models.User.hasMany(models.Post, {onDelete: 'CASCADE', foreignKey: 'userId', sourceKey: 'id'});
        models.User.hasMany(models.Comment, {onDelete: 'CASCADE', foreignKey: 'userId', sourceKey: 'id'});
        models.User.hasMany(models.Report, {onDelete: 'CASCADE', foreignKey: 'userId', sourceKey: 'id'});
        models.User.belongsToMany(models.Post,  {
            as : 'UserLikePosts',
            through: 'UserAndPost',
            foreignKey: 'userId',
            sourceKey: 'id'
        });
        models.User.belongsToMany(models.Room, {
            as : 'UserRooms',
            through: 'UserAndRoom',
            foreignKey: 'userId',
            sourceKey: 'id'
        });
    };

    return User
};