'use strict';
module.exports = (sequelize, DataTypes) => {
  class Project extends sequelize.Sequelize.Model {}
  Project.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull() {
          if(!this.title) {
            throw new customError(400, 'TITLE MUST BE FILLED')
          }
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: "Project"
  });
  Project.associate = function(models) {
    // associations can be defined here
    Project.belongsToMany(models.User, {through: 'ProjectUser'})
    Project.hasMany(models.Task)
  };
  return Project;
};