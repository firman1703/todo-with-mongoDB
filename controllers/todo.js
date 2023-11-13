const Todo = require('../models/Todo');

module.exports = {
    createTodo: async (req, res) => {
        try {
            const { title, description } = req.body;
            const userId = req.user.id;

            const newTodo = new Todo({
                user: userId,
                title,
                description,
            });

            await newTodo.save();

            res.status(201).json({
                message: 'Data Berhasil Ditambahkan'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    getAlltodos: async (req, res) => {
        try {
            const userId = req.user.id;
            const todos = await Todo.find({ user: userId });
            res.json(todos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    getTodoById: async (req, res) => {
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
    },
    updateTodo: async (req, res) => {
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

            res.json({
                message: "data Telah Di updated"
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    deleteTodo: async (req, res) => {
        try {
            const todoId = req.params.id;
            const userId = req.user.id;

            const deletedTodo = await Todo.findOneAndDelete({ _id: todoId, user: userId });

            if (!deletedTodo) {
                return res.status(404).json({ message: 'Todo not found' });
            }

            res.json({
                message: "berhasil Menghapus data" + Todo.title
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    deleteAllTodos: async (req, res) => {
        try {
            const userId = req.user.id;

            const deletedTodos = await Todo.deleteMany({ user: userId });

            res.json({
                message: "berhasil menghapus semua data"
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    }
}