const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Designation = sequelize.define('Designation', {
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
    department: {
      type: DataTypes.UUID, // Assuming the department is stored as an integer (foreign key).
      allowNull: false,
    },
    designationName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    designationCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // user: {
    //   type: DataTypes.INTEGER, // Assuming the user is stored as an integer (foreign key).
    //   allowNull: false,
    // },
  });
  
  module.exports = Designation;