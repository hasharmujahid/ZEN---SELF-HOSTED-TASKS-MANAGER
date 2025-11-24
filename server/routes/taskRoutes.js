const express = require('express');
const router = express.Router();
const {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
} = require('../controllers/taskController');
const {
    startTimer,
    stopTimer,
    getTimeLogs
} = require('../controllers/timeController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getTasks)
    .post(protect, createTask);

router.route('/:id')
    .put(protect, updateTask)
    .delete(protect, deleteTask);

router.post('/:id/timer/start', protect, startTimer);
router.post('/:id/timer/stop', protect, stopTimer);
router.get('/:id/logs', protect, getTimeLogs);

module.exports = router;
