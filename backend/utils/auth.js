const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your-secret-key'; // In production, use environment variable

const generateToken = (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' });
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded.userId;
    } catch (error) {
        console.error('Token verification error:', error);
        return null;
    }
};

const extractTokenFromHeader = (req) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }
    return authHeader.split(' ')[1];
};

module.exports = {
    generateToken,
    verifyToken,
    extractTokenFromHeader,
    JWT_SECRET
}; 