const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxLength: [32, 'Title must be at most 32 characters long'],
      required: [true, 'Title is required'],
    },
    description: {
      type: String,
      maxLength: [256, 'Description must be at most 256 characters long'],
      default: '',
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      select: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Todo', todoSchema);
