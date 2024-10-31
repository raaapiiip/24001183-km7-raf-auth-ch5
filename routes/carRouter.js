const express = require('express');
const { carController } = require('../controllers');
const { uploadImage, authenticateToken, authorizeRole } = require('../middlewares');

const router = express.Router();

router.get('', authenticateToken, carController.getAllCar);
router.get('/:id', authenticateToken, carController.getCarById);
router.post('', authenticateToken, authorizeRole('superadmin', 'admin'), uploadImage.single("carImage"), carController.createCar);
router.patch('/:id', authenticateToken, authorizeRole('superadmin', 'admin'), uploadImage.single("carImage"), carController.updateCar);
router.delete('/:id', authenticateToken, authorizeRole('superadmin', 'admin'), carController.deleteCar);

module.exports = router;
