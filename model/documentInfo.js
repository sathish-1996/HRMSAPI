const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');


const DocumentInfo = sequelize.define('DocumentInfo', {

  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  user: {
    type: DataTypes.UUID,
    allowNull: false,

  },
  empid: {
    type: DataTypes.UUID,
    allowNull: false

  },
  employeeBasic: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  employeeBank: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  employeeSalary: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  emailid: {
    type: DataTypes.STRING,
    allowNull: false,
  },


});
DocumentInfo.hasMany(DocumentInfo, {
  foreignKey: "id"
});
module.exports = DocumentInfo;