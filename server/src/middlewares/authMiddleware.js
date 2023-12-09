const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

/**
 * This function is used to verify the current token from user's cookie.
 *
 * @param {token} token - JWT token
 */
const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return reject(err);
      }

      resolve(decoded);
    });
  });

/**
 * This function is used to protect routes from unauthorized users.
 *
 * @param {req} req - Express's request object
 * @param {res} res - Express's response object
 * @param {next} next - Express's next function
 */
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // Get token from authorization header.
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    // Get token from cookie.
    token = req.cookies.jwt;
  }

  // Check if token exists.
  if (!token) {
    return next(new AppError('You are not logged in, please log in to get access.', 401));
  }

  // Verify token.
  const decodedToken = await verifyToken(token);

  // Check if user still exists.
  const currentUser = await User.findById(decodedToken.id);
  if (!currentUser) {
    return next(new AppError('The user belonging to this token no longer exists.', 401));
  }

  // Grant access to protected route.
  req.user = currentUser;
  next();
});
