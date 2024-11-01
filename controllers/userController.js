const { User } = require('../models');

const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll();
    if (users.length === 0) {
      return res.status(204).json({
        status: 'Succeed',
        message: 'No users found',
        isSuccess: true,
        data: null,
      });
    }

    return res.status(200).json({
      status: 'Succeed',
      message: 'Success to get all user data',
      isSuccess: true,
      data: { users },
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

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Invalid user id',
        isSuccess: false,
        data: null,
      });
    }

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({
        status: 'Failed',
        message: 'User data not found',
        isSuccess: false,
        data: null,
      });
    }

    return res.status(200).json({
      status: 'Succeed',
      message: 'Success to get user data by id',
      isSuccess: true,
      data: user,
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
  getAllUser,
  getUserById,
};
