const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const asyncHandler = require('../middlewares/async.middleware');
const ErrorResponse = require('../utils/ErrorResponse');

// @desc Register a new user
// @route POST /api/v1/auth/register
// @access Public
exports.register = asyncHandler(async (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
        return next(new ErrorResponse('Please fill in all fields', 400));
    }
    if (password !== confirmPassword) {
        return next(new ErrorResponse('Passwords do not match', 400));
    }
    if (username.length < 5) {
        return next(new ErrorResponse('Username must be at least 5 characters long', 400));
    }
    if (password.length < 4) {
        return next(new ErrorResponse('Password must be at least 4 characters long', 400));
    }

    const existingUser = await User.findOne({
        $or: [
            { email: email.toLowerCase() },
            { username: username.toLowerCase() } 
        ]
    });

    if (existingUser) {
        return next(new ErrorResponse('This username or email is already registered', 400));
    }

    let role = 'user';
    if (
        process.env.ADMIN_USERNAME === username &&
        process.env.ADMIN_PASSWORD === password
    ) {
        role = 'admin';
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password,
        role,
        apiKey: uuid.v4(),
    });

    res.status(201).json({
        success: true,
        message: "User successfully registered",
        data: {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            apiKey: user.apiKey,
        },
    });
});

// @desc Login user
// @route POST /api/v1/auth/login
// @access Public
exports.login = asyncHandler(async(req, res, next) => {
    const { username, password } = req.body;

    if(!username || !password) {
        return next(new ErrorResponse('Please provide all fields', 400));
    }

    const user = await User.findOne({ username: username.toLowerCase() }).select('+password');

    if(!user) {
        return next(new ErrorResponse('Invalid username or password', 401));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return next(new ErrorResponse('Invalid username or password', 401));
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '12h' });

    res.status(200).json({
        success: true,
        data: user,
        message: "User logged in successfully",
        token,
    });
});

// @desc Logout user
// @route POST /api/v1/auth/logout
// @access Private
exports.logout = asyncHandler(async (req, res, next) => {
    res.clearCookie('token');

    res.status(200).json({
        success: true,
        message: 'User logged out successfully',
    });
});
