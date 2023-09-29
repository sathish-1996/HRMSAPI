const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');


const CreateAssignment = sequelize.define('CreateAssignment', {
  question: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  option: {
    type: DataTypes.ARRAY(DataTypes.STRING), 
    allowNull: false,
  },
  correctAnswer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = CreateAssignment;