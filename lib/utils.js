const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/config').jwtConfig

const generateToken = function (data) {
  return jwt.sign(data, jwtConfig.secretKey, {
    expiresIn: jwtConfig.expiresIn
  })
};

module.exports = {
  generateToken,
};
