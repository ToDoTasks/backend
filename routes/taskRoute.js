const express = require('express');
const { createTask, editTask, deleteTask, getUserTasks } = require('../controllers/taskController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();
const {createTaskValidator, editTaskValidator, validator} = require('../middleware/validateBody');

router.post('/task/create', createTaskValidator ,validator, verifyToken, createTask);
router.put('/task/edit',editTaskValidator, validator, verifyToken, editTask);
router.delete('/task/delete/:taskId', verifyToken, deleteTask);
router.get('/task/all', verifyToken, getUserTasks);

module.exports = router;