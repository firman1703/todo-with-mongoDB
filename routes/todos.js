const express = require('express');
const route = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { createTodo, getAlltodos, getTodoById, updateTodo, deleteTodo, deleteAllTodos } = require('../controllers/todo');


route.post('/', authMiddleware, createTodo);
route.get('/', authMiddleware, getAlltodos);
route.get('/:id', authMiddleware, getTodoById);
route.put('/:id', authMiddleware, updateTodo);
route.delete('/:id', authMiddleware, deleteTodo);
route.delete('/', authMiddleware, deleteAllTodos);

module.exports = route
