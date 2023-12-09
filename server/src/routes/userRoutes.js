const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Protect all routes after this middleware.
router.use(authMiddleware.protect);

router.get('/me', userController.getUser);
router.patch('/me/change-profile', userController.updateProfile);
router.patch('/me/change-password', userController.updatePassword);

module.exports = router;
