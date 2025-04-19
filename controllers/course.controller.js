const Course = require('../models/course.model');
const Category = require('../models/category.model');
const asyncHandler = require("../middlewares/async.middleware");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc Get all Courses
// @route GET /api/v1/course/all
// @access Public
exports.getAllCourses = asyncHandler(async (req, res, next) => {
    const courses = await Course.find();
    res.status(200).json({
        success: true,
        count: courses.length,
        message: "Courses found successfully",
        data: courses
    });
});

// @desc Get single Course
// @route GET /api/v1/course/:id
// @access Public
exports.getCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        return next(new ErrorResponse(`Course not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        message: "Course found successfully",
        data: course
    });
});

// @desc Create new Course
// @route POST /api/v1/course/create
// @access Private
exports.createCourse = asyncHandler(async (req, res, next) => {
    const { category, title, description, videoUrl, part, rating } = req.body;

    if (!category || !title || !description || !videoUrl || !part) {
        return next(new ErrorResponse('Please provide all required fields', 400));
    }

    const categoryExists = await Category.findOne({ title: category });
    if (!categoryExists) {
        return res.status(400).json({
            success: false,
            message: `Category '${category}' does not exist. Please create the category first.`,
        });
    }


    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Image is required.",
        });
    }

    const course = await Course.create({
        category,
        title,
        description,
        image: req.file.path,
        videoUrl,
        part,
        rating,
    });

    res.status(201).json({
        success: true,
        message: "Course created successfully",
        data: course
    });
});

// @desc Update Course
// @route PUT /api/v1/course/update/:id
// @access Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        return next(new ErrorResponse(`Course not found with id of ${req.params.id}`, 404));
    }

    if (req.body.category) {
        const categoryExists = await Category.findOne({ title: req.body.category });
        if (!categoryExists) {
            return res.status(400).json({
                success: false,
                message: `Category '${req.body.category}' does not exist. Please create the category first.`,
            });
        }
    }

    if (req.file) {
        req.body.image = req.file.path;
    }

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse
    });
});

// @desc Delete Course
// @route DELETE /api/v1/course/delate/:id
// @access Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
        return next(new ErrorResponse(`Course not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        message: "Course deleted successfully",
        data: {}
    });
});