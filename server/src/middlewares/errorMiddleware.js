const mongoose = require('mongoose');
const AppError = require('../utils/appError');

/**
 * This function is used to throw an error.
 *
 * @param {err} err - Express's error object
 * @param {req} req - Express's request object
 * @param {res} res - Express's response object
 * @return void
 */
const sendError = (err, req, res) => {
  if (err.isOperational) {
    // Operational error, trusted error: send message to the client.
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Unknown error: do not send message to the client.
    // Log the error to the console.
    console.error('ERROR 💥', err);

    // Send generic message.
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong, please try again later.',
    });
  }
};

/**
 * This function is used to handle JWT invalid token errors.
 *
 * @return A new error 'AppError' object
 */
const handleJWTError = () => new AppError('Invalid token, please log in again.', 401);

/**
 * This function is used to handle JWT expired error.
 *
 * @return A new error 'AppError' object
 */
const handleJWTExpiredError = () =>
  new AppError('Your token has expired, please log in again.', 401);

/**
 * This function is used to handle cast errors.
 *
 * @param {*} err - Express's error object
 * @return A new error 'AppError' object
 */
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

/**
 * This function is used to handle duplicate fields error.
 *
 * @param {*} err - Express's error object
 * @return A new error 'AppError' object
 */
const handleDuplicateFieldsDB = (err) => {
  const message = `${Object.keys(err.keyValue)
    .map((key) => `${err.keyValue[key]} is already taken for ${key} field`)
    .join(', ')}.`;
  return new AppError(message, 400);
};

/**
 * This function is used to handle validation errors.
 *
 * @param {*} err - Express's error object
 * @return A new error 'AppError' object
 */
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `${errors.join(', ')}.`;
  return new AppError(message, 400);
};

/**
 * This is the global error handling middleware of the application.
 * Start the middlewares here. End the middleware by using res.send.status.
 * The arguments (err, req, res, next) is enough for Express to know that this is an error handling method.
 *
 * @param {*} err - Express's error object
 * @param {req} req - Express's request object
 * @param {res} res - Express's response object
 * @param {next} next - Express's next function
 * @return void
 */
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let errorCopy = { ...err };
  errorCopy.message = err.message;

  if (err instanceof mongoose.Error.CastError) {
    errorCopy = handleCastErrorDB(errorCopy);
  }

  if (errorCopy.code === 11000) {
    errorCopy = handleDuplicateFieldsDB(errorCopy);
  }

  if (err instanceof mongoose.Error.ValidationError) {
    errorCopy = handleValidationErrorDB(errorCopy);
  }

  if (errorCopy.name === 'JsonWebTokenError') {
    errorCopy = handleJWTError();
  }

  if (errorCopy.name === 'TokenExpiredError') {
    errorCopy = handleJWTExpiredError();
  }

  sendError(errorCopy, req, res);
};
