const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    part: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        default: 0,
    },
    rating: {
        type: String,
        default: 5,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Course', courseSchema);