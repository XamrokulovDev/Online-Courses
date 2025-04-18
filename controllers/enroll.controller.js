const User = require('../models/user.model');
const Course = require('../models/course.model');
const Category = require('../models/category.model');
const asyncHandler = require('../middlewares/async.middleware');
const ErrorResponse = require('../utils/ErrorResponse');

// @desc Enroll user to a category
// @route POST /api/v1/enroll/create
// @access Public
exports.enrollToCategory = asyncHandler(async (req, res, next) => {
    const { userId, categoryId } = req.body;

    const user = await User.findById(userId);
    const category = await Category.findById(categoryId);

    if (!user || !category) {
        return next(new ErrorResponse('User or Category not found', 404));
    }

    const isUserAlreadyEnrolled = user.course?.includes(categoryId);
    const isCategoryHasUser = category.users?.includes(userId);

    if (isUserAlreadyEnrolled && isCategoryHasUser) {
        return res.status(200).json({
            success: false,
            message: 'User already enrolled in this category',
        });
    }

    if (!isUserAlreadyEnrolled) {
        user.course.push(categoryId);
        await user.save();
    }

    if (!isCategoryHasUser) {
        category.users.push(userId);
        await category.save();
    }

    res.status(200).json({
        success: true,
        message: 'User enrolled to category successfully',
        data: { user, category }
    });
});