const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const EmployeeLeaveAvailableDay = sequelize.define('leaveavailableday', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
 
  casualleave: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  sickleave: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  earnedleave: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  limit: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  name: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  // userId: {
  //   type: DataTypes.UUID, 
  //   allowNull: false,
  // },
}, { timestamps: false
 });

module.exports = EmployeeLeaveAvailableDay;





