module.exports = (sequelize, DataTypes) => {
    const Report = sequelize.define("Report", {
        text : {
            type : DataTypes.STRING(100),
            defaultValue : ''
        },
        state : {
            type : DataTypes.BOOLEAN,
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
    Report.associate = (models) => {
        models.Report.belongsTo(models.User, {onDelete: 'CASCADE', foreignKey: 'userId', targetKey: 'id'});
        models.Report.belongsTo(models.Comment, {onDelete: 'CASCADE', foreignKey: 'commentId', targetKey: 'id'});
    };
    return Report;
};