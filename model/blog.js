const { DataTypes } = require('sequelize');
const sequelize = require('../util/database'); 

const Blog = sequelize.define('Blog', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
  const User = sequelize.define('User', {
userId: {
  type: DataTypes.UUID, 
  primaryKey: true,
  defaultValue: DataTypes.UUIDV4, 
},
});

User.hasMany(Blog);
Blog.belongsTo(User);

module.exports = Blog;
module.exports = User;