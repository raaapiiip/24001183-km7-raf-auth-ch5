const { User } = require("../models");

const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      status: "Succeed",
      message: "Success to get users data",
      isSuccess: true,
      data: { users },
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

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ where: { id } });

    if (!user) {
      res.status(404).json({
        status: "Failed",
        message: "User data is not found",
        isSuccess: false,
        data: null,
      });
    }

    res.status(200).json({
      status: "Succeed",
      message: "Success to get user data",
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

module.exports = {
  getAllUser,
  getUserById,
};
