const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('todo', 'in-progress', 'completed', 'hold'),
        defaultValue: 'todo'
    },
    holdComment: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    totalTime: {
        type: DataTypes.INTEGER, // in seconds
        defaultValue: 0
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Task;
