module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define("Contact", {
        email: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        content: {
            type : DataTypes.STRING(200),
            allowNull : false,
        },
        state : {
            type : DataTypes.BOOLEAN,
            allowNull : false,
            defaultValue : true
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    });
    Contact.associate = (models) => {
    };

    return Contact
};