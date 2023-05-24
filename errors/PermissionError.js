const { PERMISSION_ERROR } = require('./errors_constants');

class PermissionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PermissionError';
    this.statusCode = PERMISSION_ERROR;
  }
}

module.exports = PermissionError;