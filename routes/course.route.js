const { Router } = require('express');
const router = Router();

const {
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
} = require("../controllers/course.controller");

const { protect, teacher, admin } = require("../middlewares/auth.middleware");
const upload = require("../utils/upload");

/**
 * @swagger
 * tags:
 *   name: Course
 *   description: API for managing courses
 */

/**
 * @swagger
 * /api/v1/course/all:
 *   get:
 *     summary: Get all courses
 *     description: Retrieve all the courses in the system.
 *     tags: [Course]
 *     responses:
 *       200:
 *         description: List of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Course'
 */
router.get('/all', protect, getAllCourses);

/**
 * @swagger
 * /api/v1/course/{id}:
 *   get:
 *     summary: Get a single course
 *     description: Retrieve a course by its ID.
 *     tags: [Course]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the course to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single course
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found
 */
router.get('/:id', protect, getCourse);

/**
 * @swagger
 * /api/v1/course/create:
 *   post:
 *     summary: Create a new course
 *     description: Add a new course to the system.
 *     tags: [Course]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 description: The category of the course
 *               title:
 *                 type: string
 *                 description: The title of the course
 *               description:
 *                 type: string
 *                 description: The description of the course
 *               part:
 *                 type: string
 *                 description: The part of the course
 *               rating:
 *                 type: string
 *                 description: The rating of the course
 *     responses:
 *       201:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Invalid input or missing fields
 */
router.post('/create', protect, admin || teacher, upload.single('image'), createCourse);

/**
 * @swagger
 * /api/v1/course/update/{id}:
 *   put:
 *     summary: Update an existing course
 *     description: Update the details of an existing course.
 *     tags: [Course]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the course to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               part:
 *                 type: string
 *               rating:
 *                 type: string
 *     responses:
 *       200:
 *         description: Course updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found
 */
router.put('/update/:id', protect, admin || teacher, upload.single('image'), updateCourse);

/**
 * @swagger
 * /api/v1/course/delete/{id}:
 *   delete:
 *     summary: Delete a course
 *     description: Remove a course from the system by its ID.
 *     tags: [Course]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the course to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 */
router.delete('/delete/:id', protect, admin || teacher, deleteCourse);

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - category
 *         - title
 *         - description
 *         - part
 *       properties:
 *         category:
 *           type: string
 *         image:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         part:
 *           type: string
 *         price:
 *           type: string
 *         rating:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */

module.exports = router;