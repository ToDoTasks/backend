/**
 * @swagger
 * components:
 *    schemas:
 *     UserInfo:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the task
 *         username:
 *           type: string
 *           description: The user's username
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the user was added
 */

/**
 * @swagger
 * tags:
 *   name: UserInfo
 *   description: User Info
 * /api/profile:
 *   get:
 *     summary: Get user info
 *     tags: [UserInfo]
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: The user info.
 *       500:
 *         description: Internal server error.
 * 
 */

const express = require('express');
const { fetchUserData } = require('../controllers/profileController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/profile', verifyToken, fetchUserData);

module.exports = router;