const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const EducationInfo = sequelize.define('EducationInfo', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  empid: {
    type: DataTypes.UUID,
    allowNull: false

  },
  user: {
    type: DataTypes.UUID,
    allowNull: true

  },
  schoolInfo: {
    type: DataTypes.JSON(),
    allowNull: true,
  },
  highSchoolInfo: {
    type: DataTypes.JSON(),
    allowNull: true,
  },
  dipInfo: {
    type: DataTypes.JSON(),
    allowNull: true,
  },
  ugInfo: {
    type: DataTypes.JSON(),
    allowNull: true,
  },
  pgInfo: {
    type: DataTypes.JSON(),
    allowNull: true,
  },
  masterInfo: {
    type: DataTypes.JSON(),
    allowNull: true,
  },

});

module.exports = EducationInfo;