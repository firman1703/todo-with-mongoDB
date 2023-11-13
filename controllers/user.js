const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config()

secretKey = process.env.KEY

module.exports = {
    getAllUsers: async (req, res) => {
        const users = await User.find()

        res.json({
            message: "berhasil mendapatkan data user",
            data: users
        })
    },
    regiser: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Check if the user already exists
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: 'User Sudah Ada Silahkan Login' });
            }

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create a new user
            const newUser = new User({
                username,
                password: hashedPassword,
            });

            await newUser.save();

            res.status(201).json({ message: ' Berhasil Mendaftar' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Check if the user exists
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({ message: 'Username Tidak Ditemukan' });
            }

            // Check password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Password Salah' });
            }

            // Generate JWT token
            const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });

            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    }
}