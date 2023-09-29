const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Role = sequelize.define('Role', {

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
  roleName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roleCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
  // userId: {
  //   type: DataTypes.UUID,
  //     allowNull: false,
  // },
});

module.exports = Role;