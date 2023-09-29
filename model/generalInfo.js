const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
//const jwt = require("jsonwebtoken");
const GeneralInfo = sequelize.define('GeneralInfo', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  // user: {
  //   type: DataTypes.UUID,
  //   allowNull: true,
  // },
  emailid:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  phoneno:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  personalInfo: {
    type: DataTypes.JSON(), 
    allowNull: true,
  },
  empfamily: {
    type: DataTypes.JSON(), 
    allowNull: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // userId: {
  //    type: DataTypes.UUID,
  //   // references: {
  //   //   model: 'User',
  //   //   key: 'id',
  //   allowNull: false,
  //   },
  },
);

module.exports = GeneralInfo;