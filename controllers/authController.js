const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { User } = require('../models');

dotenv.config();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Email and password are required',
        isSuccess: false,
        data: null,
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        status: 'Failed',
        message: 'User not found',
        isSuccess: false,
        data: null,
      });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(401).json({
        status: 'Failed',
        message: 'Invalid email or password',
        isSuccess: false,
        data: null,
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRED || '1h' }
    );

    return res.status(200).json({
      status: 'Succeed',
      message: 'Login successful',
      isSuccess: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
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

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const emailLowerCase = email.toLowerCase();

    const existingUser = await User.findOne({ where: { email: emailLowerCase } });
    if (existingUser) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Email is already in use',
        isSuccess: false,
        data: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email: emailLowerCase,
      password: hashedPassword,
      role: 'member',
    });

    return res.status(201).json({
      status: 'Succeed',
      message: 'Member registered successfully',
      isSuccess: true,
      data: { user: newUser },
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

const addAdmin = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const emailLowerCase = email.toLowerCase();

    const existingUser = await User.findOne({ where: { email: emailLowerCase } });
    if (existingUser) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Email is already in use',
        isSuccess: false,
        data: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await User.create({
      name,
      email: emailLowerCase,
      password: hashedPassword,
      role: 'admin',
    });
    
    return res.status(201).json({
      status: 'Succeed',
      message: 'Admin added successfully',
      isSuccess: true,
      data: { user: newAdmin },
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
  login,
  register,
  addAdmin,
};
