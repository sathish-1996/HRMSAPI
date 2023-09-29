const { DataTypes } = require('sequelize');
const jwt = require("jsonwebtoken");
const sequelize = require('../util/database');


const User = sequelize.define('user', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 150], 
    },
  },
});

// User.hasOne(GeneralInfo);
// User.hasOne(EducationInfo);
// User.hasOne(WorkInfo);
// User.hasOne(DocumentInfo);

// Sequelize.sync()
//     .then(() => {
//         console.log('User model synced with the database.');
//     })
//     .catch(err => {
//         console.error('Error syncing User model:', err);
//     });

// User.generateAuthToken = function () {
//   const token = jwt.sign({ _id: this.id }, process.env.JWTPRIVATEKEY, { expiresIn: '1 day' });
//   return token;
// };

module.exports = User;