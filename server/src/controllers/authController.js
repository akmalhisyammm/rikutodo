const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

/**
 * This function is used to sign the JWT to check whether the token is valid or not.
 *
 * @param {id} id - ID of the user.
 */
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

/**
 * This function is used to create and send token to user's cookie.
 *
 * @param {user} user - Currently logged in user
 * @param {statusCode} statusCode - Status code of the request
 * @param {req} req - Express's request object
 * @param {res} res - Express's response object
 */
const createAndSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000),
    httpOnly: true,
    // Send a cookie to be secure if its on a production environment.
    // Check if the connection is secure, OR if the header contains HTTPS.
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  };

  // Send a cookie (back-end, must be assigned again in client's proxy).
  res.cookie('jwt', token, cookieOptions);

  // Remove passwords from output, then send response.
  user.password = undefined;
  res.status(statusCode).json({ status: 'success', token, data: user });
};

/**
 * This function is used to handle user registration.
 *
 * @param {req} req - Express's request object
 * @param {res} res - Express's response object
 * @param {next} next - Express's next function
 */
exports.register = asyncHandler(async (req, res, next) => {
  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // Remove passwords from output, then send response.
  newUser.password = undefined;
  res.status(201).json({ status: 'success', data: newUser });
});

/**
 * This function is used to handle user when he/she is logging in.
 *
 * @param {req} req - Express's request object
 * @param {res} res - Express's response object
 * @param {next} next - Express's next function
 */
exports.login = asyncHandler(async (req, res, next) => {
  // Check if username and password exist.
  if (!req.body.username || !req.body.password) {
    return next(new AppError('Please provide username and password.', 400));
  }

  // Check if user exists and the credentials are correct.
  const user = await User.findOne({ username: req.body.username }).select('+password');

  if (!user || !(await user.comparePassword(req.body.password, user.password))) {
    return next(new AppError('Incorrect username or password.', 401));
  }

  // If everything is OK, send token to client.
  createAndSendToken(user, 200, req, res);
});

/**
 * This function is used to handle a user's logging out.
 *
 * @param {req} req - Express's request object
 * @param {res} res - Express's response object
 * @param {next} next - Express's next function
 */
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('jwt', 'loggedOut', { expires: new Date(Date.now() + 10 * 1000), httpOnly: true });
  res.status(200).json({ status: 'success', message: 'Logged out successfully.' });
});
