const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: 'Failed',
        message: 'Invalid email or password',
        isSuccess: false,
        data: null,
      });
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRED,
        },
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
    } else {
      return res.status(500).json({
        status: 'Failed',
        message: 'Login failed',
        isSuccess: false,
        data: null,
      });
    }
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: err.message,
      isSuccess: false,
      data: null,
    });
  }
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'member',
    });
    res.status(201).json({
      status: 'Succeed',
      message: 'Member registered successfully',
      isSuccess: true,
      data: { user: newUser },
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err.message,
      isSuccess: false,
      data: null,
    });
  }
};

const addAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
    });
    res.status(201).json({
      status: 'Succeed',
      message: 'Admin added successfully',
      isSuccess: true,
      data: { user: newAdmin },
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err.message,
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
