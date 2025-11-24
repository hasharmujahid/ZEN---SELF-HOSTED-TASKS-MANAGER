const sequelize = require('../config/database');
const User = require('./User');
const Task = require('./Task');
const TimeLog = require('./TimeLog');

// Associations
User.hasMany(Task, { foreignKey: 'userId', onDelete: 'CASCADE' });
Task.belongsTo(User, { foreignKey: 'userId' });

Task.hasMany(TimeLog, { foreignKey: 'taskId', onDelete: 'CASCADE' });
TimeLog.belongsTo(Task, { foreignKey: 'taskId' });

module.exports = {
    sequelize,
    User,
    Task,
    TimeLog
};
