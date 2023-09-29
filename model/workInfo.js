const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');


const WorkInfo = sequelize.define('WorkInfo', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  empprevious: {
    type: DataTypes.JSON(),
    allowNull: false,
  },
  empid: {
    type: DataTypes.UUID,
    allowNull: false,

  },
  user: {
    type: DataTypes.UUID,
    allowNull: false,

  },


  empcurrent:{
    type: DataTypes.JSON(),
    designation: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  role: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  reportingPerson: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  pfStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tdsStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salary: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dojString: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  empCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  }
});


WorkInfo.hasMany(WorkInfo, {
  foreignKey: "id"
});


module.exports = WorkInfo;