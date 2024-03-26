const express = require('express');
const { createTask, editTask, deleteTask, getUserTasks } = require('../controllers/taskController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/task/create', verifyToken, createTask);
router.put('/task/edit', verifyToken, editTask);
router.delete('/task/delete/:id', verifyToken, deleteTask);
router.get('/task/all', verifyToken, getUserTasks);

module.exports = router;