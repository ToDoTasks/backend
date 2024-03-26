const express = require('express');
const { fetchUserData } = require('../controllers/profileController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/profile', verifyToken, fetchUserData);

module.exports = router;