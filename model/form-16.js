const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const DocumentUpload = sequelize.define('DocumentUpload', {
id: {
  type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  allowNull: false,
  primaryKey: true
},
user: {
  type: DataTypes.UUID,
  allowNull: true,
},
name: {
  type: DataTypes.STRING,
  
},
path: {
    type: DataTypes.STRING,
    
  },
  uuid: {
    type: DataTypes.STRING,
    
  },
  mime_type: {
    type: DataTypes.STRING,
    
  },
// userId: {
//   type: DataTypes.UUID, 
//   allowNull: false,
// },
});

module.exports = DocumentUpload;





