const Category = require('../models/category.model');
const asyncHandler = require("../middlewares/async.middleware");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc Get all Categories
// @route GET /api/v1/category/all
// @access Public
exports.getAllCategories = asyncHandler(async (req, res, next) => {
    const categories = await Category.find();
    res.status(200).json({
        success: true,
        count: categories.length,
        data: categories
    });
});

// @desc Get single Category
// @route GET /api/v1/category/:id
// @access Public
exports.getCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        count: category.length,
        message: 'Category found successfully',
        data: category
    });
});

// @desc Create new Category
// @route POST /api/v1/category/create
// @access Private
exports.createCategory = asyncHandler(async (req, res, next) => {
    const { title } = req.body;

    const existingCategory = await Category.findOne({ title });
    
    if (existingCategory) {
        return next(new ErrorResponse('Category with this title already exists', 400));
    }

    const category = await Category.create({ title });

    res.status(201).json({
        success: true,
        data: category
    });
});

// @desc Update Category
// @route PUT /api/v1/category/update/:id
// @access Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
    const { title } = req.body;

    const existingCategory = await Category.findOne({ title });

    if (existingCategory && existingCategory._id.toString() !== req.params.id) {
        return next(new ErrorResponse('Category with this title already exists', 400));
    }

    const category = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!category) {
        return next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        message: 'Category updated successfully',
        data: category
    });
});

// @desc Delete Category
// @route DELETE /api/v1/category/delete/:id
// @access Private  
exports.deleteCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
        return next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: {}
    });
});