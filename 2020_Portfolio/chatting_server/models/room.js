module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define("Room", {
        userAt: {
            type: DataTypes.DATE(),
            allowNull: true,
        },
        managerAt: {
            type: DataTypes.DATE(),
            allowNull: true,
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
    Room.associate = (models) => {
        models.Room.belongsToMany(models.User,  {
            as : 'Participants',
            through: 'UserAndRoom',
            foreignKey: 'roomId',
            sourceKey: 'id'
        });
    };

    return Room
};