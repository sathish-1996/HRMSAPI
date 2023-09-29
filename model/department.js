const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Department = sequelize.define('Department', {
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
  departmentName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departmentCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // userId: {
  //   type: DataTypes.UUID, 
  //   allowNull: false,
  // },
});

module.exports = Department;





