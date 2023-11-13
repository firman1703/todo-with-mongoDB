const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Todo = require('../models/Todo');

// Create Todo
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.id;

        const newTodo = new Todo({
            user: userId,
            title,
            description,
        });

        await newTodo.save();

        res.status(201).json(newTodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Read All Todos for a User
router.get('/', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const todos = await Todo.find({ user: userId });
        res.json(todos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Read Todo Details
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const todoId = req.params.id;
        const userId = req.user.id;

        const todo = await Todo.findOne({ _id: todoId, user: userId });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Update Todo
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const todoId = req.params.id;
        const userId = req.user.id;

        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: todoId, user: userId },
            { $set: req.body },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json(updatedTodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Delete Todo
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const todoId = req.params.id;
        const userId = req.user.id;

        const deletedTodo = await Todo.findOneAndDelete({ _id: todoId, user: userId });

        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json(deletedTodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Delete All Todos for a User
router.delete('/', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        const deletedTodos = await Todo.deleteMany({ user: userId });

        res.json(deletedTodos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
