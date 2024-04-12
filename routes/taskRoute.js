/**
 * @swagger
 * components:
 *    schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - endDate
 *         - priority
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the task
 *         title:
 *           type: string
 *           description: The task title
 *         description:
 *           type: string
 *           description: The task desciption
 *         endDate:
 *           type: string
 *           format: date
 *           description: The task end Date
 *         priority:
 *           type: string
 *           description: The task priority level
 *       example:
 *          title: First Task
 *          description: The first task
 *          endDate: 2024-04-11T02:20:29.581Z
 *          priority: Low
 * 
 */

/**
 * @swagger
 * tags:
 *   name: Task
 *   description: Task Manager API
 * /api/task:
 *   post:
 *     summary: Create a new user
 *     tags: [Task]
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: The created task.
 *       500:
 *         description: Inernal Server error.
 *   get:
 *     summary: Get user's tasks
 *     security:
 *       - Authorization: []
 *     tags: [Task]
 *     responses:
 *       200:
 *         description: The user tasks list.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *        
 *       500:
 *         description: Internal server error.
 * 
 * 
 * /api/task/{id}:
 *   put:
 *     summary: Edit a user's task by id
 *     tags: [Task]
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: The task was updated.
 *        
 *       500:
 *         description: Internal server error.
 *   delete:
 *     summary: Delete a user task by id
 *     security:
 *       - Authorization: []
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *     responses:
 *       200:
 *         description: The user tasks was deleted.
 *       500:
 *         description: Internal server error.
 *
 */

const express = require('express');
const { createTask, editTask, deleteTask, getUserTasks } = require('../controllers/taskController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();
const {taskValidator, validator} = require('../middleware/validateBody');

router.post('/task',verifyToken, taskValidator, validator ,createTask);
router.get('/task', verifyToken, getUserTasks);
router.put('/task/:id',verifyToken, taskValidator, validator, editTask);
router.delete('/task/:id', verifyToken, deleteTask);


module.exports = router;