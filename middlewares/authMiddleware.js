const jwt = require('jsonwebtoken');
require('dotenv').config()

secretKey = process.env.KEY

function authMiddleware(req, res, next) {
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).json({ message: 'Tak Da Token, authorization Ditolak' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Token tak Da' });
    }
}

module.exports = authMiddleware;
