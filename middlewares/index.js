const authenticateToken = require('./authenticate');
const authorizeRole = require('./authorize');
const uploadImage = require('./uploader');

module.exports = {
  authenticateToken,
  authorizeRole,
  uploadImage,
};
