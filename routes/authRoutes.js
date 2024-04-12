/**
 * @swagger
 * components:
 *    schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         username:
 *           type: string
 *           description: The user's username
 *         password:
 *           type: string
 *           description: The user's password
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the user was added
 *       example:
 *         username: jane
 *         password: password
 * 
 *     ResfreshToken:
 *       type: object
 *       required:
 *         - requestToken
 *       properties:
 *         accessToken:
 *           type: string
 *           description: The user's accesToken
 *         expire_at:
 *           type: string
 *           description: The accessToken duration
 *       example:
 *         requestToken: 3dc39de9-c8eb-4492-87ec-99f78ad62c4e
 */


/**
 * @swagger
 * tags:
 *   name: User
 *   description: User authentification API
 * /api/sign-up:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: SignUp error.
 * 
 * 
 * /api/sign-in:
 *   post:
 *     summary: Login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Login successfull.
 *        
 *       500:
 *         description: Internal server error.
 * 
 * 
 * /api/refresh-token:
 *   post:
 *     summary: Get a new JwtToken
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResfreshToken'
 *     responses:
 *       200:
 *         description: jwtToken generated.
 *        
 *       500:
 *         description: Internal server error.

 *
 */

const express = require('express');
const { register, signIn, refreshToken } = require('../controllers/authController');
const router = express.Router();
const {authValidator, refrehTokenValidator, validator} = require('../middleware/validateBody');

router.post('/sign-up', authValidator, validator, register);

router.post('/sign-in', authValidator, validator, signIn);

router.post('/refresh-token', refrehTokenValidator, validator, refreshToken);

module.exports = router;