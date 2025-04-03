const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        if (error.name === "TokenExpiredError") {
            return res.status(403).json({ message: "Token Expired. Please Login Again." });
        }
        res.status(403).json({ message: "Invalid Token." });
    }
};

module.exports = authMiddleware;
