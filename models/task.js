'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId'
      })
    }
  }
  Task.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    endDate: DataTypes.DATE,
    priority: DataTypes.STRING,
    userId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};