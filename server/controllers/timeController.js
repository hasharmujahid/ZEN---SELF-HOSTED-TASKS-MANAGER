const { Task, TimeLog } = require('../models');

// @desc    Start a timer for a task
// @route   POST /api/tasks/:id/timer/start
// @access  Private
const startTimer = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.userId !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        // Check if there is already a running timer for this task
        const runningLog = await TimeLog.findOne({
            where: {
                taskId: task.id,
                endTime: null
            }
        });

        if (runningLog) {
            return res.status(400).json({ message: 'Timer already running for this task' });
        }

        // Stop any other running timers for this user (optional, but good practice for single-focus)
        // For now, let's allow multiple timers or just focus on one. Requirement says "Only one task can have an active timer".
        // So we need to find ANY running timer for this user and stop it.
        // But TimeLog doesn't have userId directly, we need to join with Task.
        // Let's skip that complexity for a second and just create the log.
        // Actually, let's implement the "Only one active timer" rule.

        // Find all tasks for user
        const userTasks = await Task.findAll({ where: { userId: req.user.id }, attributes: ['id'] });
        const taskIds = userTasks.map(t => t.id);

        const activeLog = await TimeLog.findOne({
            where: {
                taskId: taskIds,
                endTime: null
            }
        });

        if (activeLog) {
            // Stop the active log
            const now = new Date();
            const duration = Math.floor((now - new Date(activeLog.startTime)) / 1000);
            await activeLog.update({ endTime: now, duration });

            // Update total time for that task
            const activeTask = await Task.findByPk(activeLog.taskId);
            await activeTask.increment('totalTime', { by: duration });
        }

        const log = await TimeLog.create({
            taskId: task.id,
            startTime: new Date()
        });

        res.status(201).json(log);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Stop a timer
// @route   POST /api/tasks/:id/timer/stop
// @access  Private
const stopTimer = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.userId !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const log = await TimeLog.findOne({
            where: {
                taskId: task.id,
                endTime: null
            }
        });

        if (!log) {
            return res.status(400).json({ message: 'No running timer for this task' });
        }

        const now = new Date();
        const duration = Math.floor((now - new Date(log.startTime)) / 1000);

        await log.update({
            endTime: now,
            duration
        });

        await task.increment('totalTime', { by: duration });

        res.json(log);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get time logs for a task
// @route   GET /api/tasks/:id/logs
// @access  Private
const getTimeLogs = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.userId !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const logs = await TimeLog.findAll({
            where: { taskId: task.id },
            order: [['startTime', 'DESC']]
        });

        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    startTimer,
    stopTimer,
    getTimeLogs
};
