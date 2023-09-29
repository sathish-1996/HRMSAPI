const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const ITSupport = sequelize.define('ITSupport', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    user: {
        type: DataTypes.UUID,
        allowNull: false
    },
    supportType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    supportDesc: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
module.exports = ITSupport