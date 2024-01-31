const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth'); 

// User Signup
router.post('/signup', userController.signup);

// User Login
router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.post('/change-password/:userId', userController.changePassword);
router.post('/send-message', userController.sendMessage);

// User Logout
router.get('/logout', userController.logout);

router.get('/verify-user', authMiddleware, userController.getUserData);
router.get('/check-user/:userId', userController.checkUserExistance);

module.exports = router;
