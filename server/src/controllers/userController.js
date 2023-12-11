const User = require('../models/userModel');
const AppError = require('../utils/appError');
const asyncHandler = require('../utils/asyncHandler');

/**
 * This function is used to get current user's data.
 *
 * @param {req} req - Express's request object
 * @param {res} res - Express's response object
 * @param {next} next - Express's next function
 */
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({ status: 'success', data: user });
});

/**
 * This function is used to update current user's profile.
 *
 * @param {req} req - Express's request object
 * @param {res} res - Express's response object
 * @param {next} next - Express's next function
 */
exports.updateProfile = asyncHandler(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError('This route is not for password updates, please use /me/change-password.', 400),
    );
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { username: req.body.username, email: req.body.email },
    { new: true, runValidators: true },
  );

  res.status(200).json({ status: 'success', data: updatedUser });
});

/**
 * This function is used to update current user's password.
 *
 * @param {req} req - Express's request object
 * @param {res} res - Express's response object
 * @param {next} next - Express's next function
 */
exports.updatePassword = asyncHandler(async (req, res, next) => {
  if (req.body.username || req.body.email) {
    return next(
      new AppError(
        'This route is not for username or email updates, please use /me/change-profile.',
        400,
      ),
    );
  }

  if (!req.body.currentPassword || !req.body.password || !req.body.passwordConfirm) {
    return next(
      new AppError('Please provide current password, password and password confirmation.', 400),
    );
  }

  const user = await User.findById(req.user.id).select('+password');

  const isPasswordCorrect = await user.comparePassword(req.body.currentPassword, user.password);

  if (!isPasswordCorrect) {
    return next(new AppError('Current password is incorrect.', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  res.status(204).json({ status: 'success', message: 'Password updated successfully.' });
});
