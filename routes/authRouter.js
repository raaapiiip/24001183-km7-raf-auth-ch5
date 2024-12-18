const express = require('express');
const { authController } = require('../controllers');
const authenticateToken = require('../middlewares/authenticate');
const authorizeRole = require('../middlewares/authorize');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/add-admin', authenticateToken, authorizeRole('superadmin'), authController.addAdmin);

module.exports = router;
