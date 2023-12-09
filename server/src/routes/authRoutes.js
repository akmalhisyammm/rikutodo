const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/logout', authController.logout);
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
