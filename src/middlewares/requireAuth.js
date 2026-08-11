const userModel = require('../models/user.model');
const { verifyToken } = require('../utils/jwt');

const requireAuth = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied, no token' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const payload = verifyToken(token);
        const user = await userModel.findById(payload.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            error: 'Invalid or expired token'
        });
    }
};

module.exports = requireAuth;
