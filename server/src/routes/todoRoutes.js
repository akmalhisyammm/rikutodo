const express = require('express');
const todoController = require('../controllers/todoController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Protect all routes after this middleware.
router.use(authMiddleware.protect);

router.route('/').get(todoController.getAllTodos).post(todoController.createTodo);

router
  .route('/:id')
  .get(todoController.getTodo)
  .patch(todoController.updateTodo)
  .delete(todoController.deleteTodo);

module.exports = router;
