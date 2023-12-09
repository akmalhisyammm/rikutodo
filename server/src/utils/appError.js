/**
 * Reference: https://github.com/lauslim12/Asuna/blob/lumine/api/src/utils/appError.js
 *
 * This class is used to handle application errors.
 *
 * @param {string} message - Error message
 * @param {number} statusCode - Error status code
 * @return void
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
