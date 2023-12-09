const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validate = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: [true, 'Username already exists'],
    maxlength: [32, 'Username must be at most 32 characters long'],
    validate: [validate.isAlphanumeric, 'Username can only contain alphanumeric characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email already exists'],
    lowercase: [true, 'Email must be in lowercase'],
    validate: [validate.isEmail, 'Email must be a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    maxlength: [32, 'Password must be at most 32 characters long'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Password confirmation is required'],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: 'Password confirmation does not match password',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);

  this.password = hashedPassword;
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
