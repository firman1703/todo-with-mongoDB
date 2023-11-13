const express = require('express');
const { getAllUsers, regiser, login } = require('../controllers/user');
const route = express.Router();

route.get('/', getAllUsers);
route.post('/register', regiser);
route.post('/login', login);

module.exports = route;
