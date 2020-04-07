'use strict';
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {}
  User.init({
  // const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "EMAIL FORMAT INVALID"
        }
      }
    } ,
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User'
  });
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Project, {through: 'ProjectUser'})
  };
  return User;
};