const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db')
const User = require('../../users/models/UserModel')

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'tasks',
  timestamps: false
});

Task.belongsTo(User, { foreignKey: 'user_id', as: 'task' })
User.hasMany(Task, { foreignKey: 'user_id' })

module.exports = Task