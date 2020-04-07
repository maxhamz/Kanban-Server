'use strict';
const {customError} = require('../helpers/customError')
module.exports = (sequelize, DataTypes) => {
  class Task extends sequelize.Sequelize.Model {}
  Task.init({
    title:  {
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
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ProjectId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Task'
  });
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.Project)
  };
  return Task;
};