const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authenticateToken = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken && bearerToken.split('Bearer ')[1];

    if (!token) {
      return res.status(401).json({
        status: 'Failed',
        message: 'Access denied. No token provided.',
        isSuccess: false,
        data: null,
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({
          status: 'Failed',
          message: 'Invalid token',
          isSuccess: false,
          data: null,
        });
      }
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({
      status: 'Failed',
      message: err.message,
      isSuccess: false,
      data: null,
    });
  }
};

module.exports = authenticateToken;