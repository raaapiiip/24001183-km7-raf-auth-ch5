const imagekit = require("../lib/imagekit");
const { Car } = require("../models");

const getAllCar = async (req, res) => {
  try {
    const cars = await Car.findAll();
    res.status(200).json({
      status: "Succeed",
      message: "Success to get cars data",
      isSuccess: true,
      data: { cars },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
      isSuccess: false,
      data: null,
    });
  }
};

const getCarById = async (req, res) => {
  try {
    const id = req.params.id;
    const car = await Car.findOne({ where: { id } });

    if (!car) {
      res.status(404).json({
        status: "Failed",
        message: "Car data is not found",
        isSuccess: false,
        data: null,
      });
    }

    res.status(200).json({
      status: "Succeed",
      message: "Success to get car data",
      isSuccess: true,
      data: car,
    });
  } catch (err) {
    return res.status(500).json({
      status: "Failed",
      message: err.message,
      isSuccess: false,
      data: null,
    });
  }
};

const createCar = async (req, res) => {
  const uploadedImages = [];
  for (const file of req.files) {
    const split = file.originalname.split(".");
    const extension = split[split.length - 1];
    const filename = split[0];

    const uploadedImage = await imagekit.upload({
      file: file.buffer,
      fileName: `Profile-${filename}-${Date.now()}.${extension}`,
    });

    uploadedImages.push(uploadedImage.url);
  }

  const newCar = req.body;
  try {
    await Car.create({ ...newCar, images: uploadedImages });

    res.status(200).json({
      status: "Succeed",
      message: "Success to add new car data",
      isSuccess: true,
      data: { ...newCar, images: uploadedImages },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
      isSuccess: false,
      data: null,
    });
  }
};

const updateCar = async (req, res) => {
  const id = req.params.id;
  const { name, brand, year, price } = req.body;
  try {
    const car = await Car.findByPk(id);

    if (car) {
      await car.update({ name, brand, year, price, updatedBy: req.user.id });

      res.status(200).json({
        status: "Succeed",
        message: "Success to update car data",
        isSuccess: true,
        data: { car },
      });
    } else if (
      req.user.id !== car.createdBy &&
      req.user.role !== "superadmin"
    ) {
      res.status(403).json({
        status: "Failed",
        message: "Not authorized to update this car",
        isSuccess: false,
        data: null,
      });
    } else {
      res.status(404).json({
        status: "Failed",
        message: "Car data is not found",
        isSuccess: false,
        data: null,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
      isSuccess: false,
      data: null,
    });
  }
};

const deleteCar = async (req, res) => {
  const id = req.params.id;
  try {
    const car = await Car.findByPk(id);

    if (car) {
      await car.update({ deletedBy: req.user.id });
      await car.destroy();

      res.status(200).json({
        status: "Succeed",
        message: "Success to delete car data",
        isSuccess: true,
        data: { car },
      });
    } else if (
      req.user.id !== car.createdBy &&
      req.user.role !== "superadmin"
    ) {
      res.status(403).json({
        status: "Failed",
        message: "Not authorized to update this car",
        isSuccess: true,
        data: null,
      });
    } else {
      res.status(404).json({
        status: "Failed",
        message: "Car data is not found",
        isSuccess: true,
        data: null,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
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
