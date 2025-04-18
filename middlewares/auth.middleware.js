const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require("dotenv").config();

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized to access this route'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized to access this route'
        });
    }
}

exports.admin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: "Your role is not teacher."
        });
    }
    next();
}

exports.teacher = (req, res, next) => {
    if (req.user.role !== 'teacher') {
        return res.status(403).json({
            success: false,
            message: 'Your role is not teacher.'
        });
    }
    next();
}

exports.user = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(403).json({
            success: false,
            message: 'Your role is not user.'
        });
    }
    next();
}