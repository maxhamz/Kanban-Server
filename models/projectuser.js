'use strict';
module.exports = (sequelize, DataTypes) => {
  class ProjectUser extends sequelize.Sequelize.Model {}
  ProjectUser.init({
    ProjectId: {
      type: DataTypes.INTEGER
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'ProjectUser'
  });
  ProjectUser.associate = function(models) {
    // associations can be defined here
    ProjectUser.belongsTo(models.User)
    ProjectUser.belongsTo(models.Project)
  };
  return ProjectUser;
};