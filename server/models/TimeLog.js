const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TimeLog = sequelize.define('TimeLog', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: true
    },
    duration: {
        type: DataTypes.INTEGER, // in seconds
        defaultValue: 0
    },
    taskId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = TimeLog;
