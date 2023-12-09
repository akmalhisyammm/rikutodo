const Todo = require('../models/todoModel');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

/**
 * This function is used to create a new todo that belong to current user.
 *
 * @param {req} req - Express's request object
 * @param {res} res - Express's response object
 * @param {next} next - Express's next function
 */
exports.createTodo = asyncHandler(async (req, res, next) => {
  const isTodoExists = !!(await Todo.findOne({ title: req.body.title, user: req.user.id }));

  if (isTodoExists) {
    return next(new AppError('Todo already exists.', 400));
  }

  const newTodo = await Todo.create({
    title: req.body.title,
    description: req.body.description,
    user: req.user.id,
  });

  newTodo.user = undefined;
  res.status(201).json({ status: 'success', data: newTodo });
});

/**
 * This function is used to get all todos that belong to current user.
 *
 * @param {req} req - Express's request object
 * @param {res} res - Express's response object
 * @param {next} next - Express's next function
 */
exports.getAllTodos = asyncHandler(async (req, res, next) => {
  const todos = await Todo.find({ user: req.user.id });

  res.status(200).json({ status: 'success', data: todos });
});

/**
 * This function is used to get a single todo that belong to current user.
 *
 * @param {req} req - Express's request object
 * @param {res} res - Express's response object
 * @param {next} next - Express's next function
 */
exports.getTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });

  if (!todo) {
    return next(new AppError('No todo found with that ID.', 404));
  }

  res.status(200).json({ status: 'success', data: todo });
});

/**
 * This function is used to update a single todo that belong to current user.
 *
 * @param {req} req - Express's request object
 * @param {res} res - Express's response object
 * @param {next} next - Express's next function
 */
exports.updateTodo = asyncHandler(async (req, res, next) => {
  const isTodoExists = !!(await Todo.findOne({
    _id: { $ne: req.params.id },
    title: req.body.title,
    user: req.user.id,
  }));

  if (isTodoExists) {
    return next(new AppError('Todo already exists.', 400));
  }

  const updatedTodo = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { title: req.body.title, description: req.body.description, isCompleted: req.body.isCompleted },
    { new: true, runValidators: true },
  );

  if (!updatedTodo) {
    return next(new AppError('No todo found with that ID.', 404));
  }

  res.status(200).json({ status: 'success', data: updatedTodo });
});

/**
 * This function is used to delete a single todo that belong to current user.
 *
 * @param {req} req - Express's request object
 * @param {res} res - Express's response object
 * @param {next} next - Express's next function
 */
exports.deleteTodo = asyncHandler(async (req, res, next) => {
  const deletedTodo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });

  if (!deletedTodo) {
    return next(new AppError('No todo found with that ID.', 404));
  }

  res.status(204).json({ status: 'success', message: 'Todo deleted successfully.' });
});
