const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address'],
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    },
    role: {
        type: String,
        enum: ['user', 'teacher', 'admin'],
        default: 'user',
    },
    course: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    }],
    balance: {
        type: String,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    apiKey: {
        type: String,
        unique: true,
        default: null,
    }
}, {
    timestamps: true,
});

// 🔒 Parolni hash qilish
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// 🔐 Token yaratish metodi
userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '12h'}
    );
};

// 🔍 Parolni tekshirish metodi
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);