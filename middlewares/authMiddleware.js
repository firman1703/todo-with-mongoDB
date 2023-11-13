const jwt = require('jsonwebtoken');
require('dotenv').config()

secretKey = process.env.KEY

function authMiddleware(req, res, next) {
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Token is not valid' });
    }
}

module.exports = authMiddleware;
