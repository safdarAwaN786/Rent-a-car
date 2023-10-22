const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth'); 

// User Signup
router.post('/signup', userController.signup);

// User Login
router.post('/login', userController.login);

// User Logout
router.get('/logout', userController.logout);

router.get('/verify-user', authMiddleware, userController.getUserData);

module.exports = router;
