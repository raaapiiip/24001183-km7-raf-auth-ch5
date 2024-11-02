const imagekit = require('../lib/imagekit');
const { Car } = require('../models');

const getAllCar = async (req, res) => {
  try {
    const cars = await Car.findAll();
    if (cars.length === 0) {
      return res.status(204).json({
        status: 'Succeed',
        message: 'No cars found',
        isSuccess: true,
        data: null,
      });
    }

    return res.status(200).json({
      status: 'Succeed',
      message: 'Success to get all car data',
      isSuccess: true,
      data: { cars },
    });
  } catch (err) {
    return res.status(500).json({
      status: 'Failed',
      message: 'Server error',
      isSuccess: false,
      data: null,
    });
  }
};

const getCarById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Invalid car id',
        isSuccess: false,
        data: null,
      });
    }

    const car = await Car.findOne({ where: { id } });
    if (!car) {
      return res.status(404).json({
        status: 'Failed',
        message: 'Car data not found',
        isSuccess: false,
        data: null,
      });
    }

    return res.status(200).json({
      status: 'Succeed',
      message: 'Success to get car data by id',
      isSuccess: true,
      data: car,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'Failed',
      message: 'Server error',
      isSuccess: false,
      data: null,
    });
  }
};

const createCar = async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ 
      status: 'Failed',
      message: 'No file or image uploaded',
      isSuccess: false,
      data: null,
    });
  }

  const split = file.originalname.split('.');

  const extension = split[split.length - 1];

  const filename = split[0];

  try {
    const uploadedImage = await imagekit.upload({
      file: file.buffer,
      fileName: `Car-${filename}-${Date.now()}.${extension}`,
    });

    const newCar = req.body;
    if (!newCar.brand || !newCar.model || !newCar.year || !newCar.plateNumber) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Missing required fields',
        isSuccess: false,
        data: null,
      });
    }

    await Car.create({ ...newCar, carImage: uploadedImage.url });

    return res.status(200).json({
      status: 'Succeed',
      message: 'Success to add new car data',
      isSuccess: true,
      data: { ...newCar, carImage: uploadedImage.url },
    });
  } catch (err) {
    return res.status(500).json({
      status: 'Failed',
      message: 'Server error',
      isSuccess: false,
      data: null,
    });
  }
};

const updateCar = async (req, res) => {
  try {
    const id = req.params.id;

    const { brand, model, year, plateNumber } = req.body;

    const car = await Car.findByPk(id);
    if (!car) {
      return res.status(404).json({
        status: 'Failed',
        message: 'Car data is not found',
        isSuccess: false,
        data: null,
      });
    }

    await car.update({ brand, model, year, plateNumber, updatedBy: req.user.id });

    return res.status(200).json({
      status: 'Succeed',
      message: 'Success to update car data',
      isSuccess: true,
      data: { car },
    });

  } catch (err) {
    return res.status(500).json({
      status: 'Failed',
      message: 'Server error',
      isSuccess: false,
      data: null,
    });
  }
};

const deleteCar = async (req, res) => {
  try {
    const id = req.params.id;

    const car = await Car.findByPk(id);
    if (!car) {
      return res.status(404).json({
        status: 'Failed',
        message: 'Car data not found',
        isSuccess: false,
        data: null,
      });
    }

    await car.update({ deletedBy: req.user.id });
    await car.destroy();

    return res.status(200).json({
      status: 'Succeed',
      message: 'Success to delete car data',
      isSuccess: true,
      data: { car },
    });
  } catch (err) {
    return res.status(500).json({
      status: 'Failed',
      message: 'Server error',
      isSuccess: false,
      data: null,
    });
  }
};

module.exports = {
  getAllCar,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
};
