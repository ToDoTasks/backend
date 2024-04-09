const express = require('express');
const { register, signIn, refreshToken } = require('../controllers/authController');
const router = express.Router();
const {authValidator, refrehTokenValidator, validator} = require('../middleware/validateBody');

router.post('/sign-up', authValidator, validator, register);

router.post('/sign-in', authValidator, validator, signIn);

router.post('/refresh-token', refrehTokenValidator, validator, refreshToken);

module.exports = router;