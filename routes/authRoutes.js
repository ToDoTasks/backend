const express = require('express');
const { register, signIn, refreshToken } = require('../controllers/authController');
const router = express.Router();

router.post('/sign-up', register);

router.post('/sign-in', signIn);

router.post('/refresh-token', refreshToken);

module.exports = router;