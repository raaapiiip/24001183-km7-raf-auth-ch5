const authorizeRole = (...role) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return res.status(401).json({
          status: 'Failed',
          message: 'User not authenticated',
          isSuccess: false,
          data: null,
        });
      }

      if (req.user.role !== role && req.user.role !== 'superadmin') {
        return res.status(403).json({
          status: 'Failed',
          message: 'Access denied. Insufficient privileges.',
          isSuccess: false,
          data: null,
        });
      }
      next();
    } catch (err) {
      return res.status(500).json({
        status: 'Failed',
        message: 'Server error',
        isSuccess: false,
        data: null,
      });
    }
  };
};

module.exports = authorizeRole;

