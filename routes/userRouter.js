const express = require('express');
const { userController } = require('../controllers');
const { authenticateToken, authorizeRole } = require('../middlewares');

const router = express.Router();

router.get('', authenticateToken,  authorizeRole('superadmin'), userController.getAllUser);
router.get('/:id', authenticateToken,  authorizeRole('superadmin'), userController.getUserById);

module.exports = router;
