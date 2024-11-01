const express = require('express');
const { userController } = require('../controllers');
const authenticateToken = require('../middlewares/authenticate');
const authorizeRole = require('../middlewares/authorize');

const router = express.Router();

router.get('', authenticateToken,  authorizeRole('superadmin'), userController.getAllUser);
router.get('/:id', authenticateToken,  authorizeRole('superadmin'), userController.getUserById);

module.exports = router;
