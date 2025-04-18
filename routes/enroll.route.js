const { Router } = require('express');
const router = Router();
const { enrollToCategory } = require('../controllers/enroll.controller');
const { protect } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Enrollment
 *   description: User Enrollment to Categories
 */


/**
 * @swagger
 * /api/v1/enroll/create:
 *   post:
 *     summary: Enroll a user into a category
 *     description: Enroll a user into a category by their userId and categoryId.
 *     tags: [Enrollment]
 *     parameters:
 *       - name: userId
 *         in: body
 *         description: The ID of the user to be enrolled.
 *         required: true
 *         schema:
 *           type: string
 *       - name: categoryId
 *         in: body
 *         description: The ID of the category the user is enrolling in.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User successfully enrolled into the category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 'User enrolled to category successfully'
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       description: The enrolled user data
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         email:
 *                           type: string
 *                     category:
 *                       type: object
 *                       description: The category to which the user was enrolled
 *                       properties:
 *                         _id:
 *                           type: string
 *                         title:
 *                           type: string
 *       404:
 *         description: User or Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 'User or Category not found'
 *       400:
 *         description: Bad Request if user is already enrolled in the category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 'User already enrolled in this category'
 */
router.post('/create', protect, enrollToCategory);

/**
 * @swagger
 * components:
 *   schemas:
 *     Enrollment:
 *       type: object
 *       required:
 *         - user
 *         - category
 *       properties:
 *         _id:
 *           type: string
 *           description: The enrollment's ID
 *         user:
 *           type: string
 *           description: The ID of the user being enrolled
 *         category:
 *           type: string
 *           description: The ID of the category in which the user is enrolled
 *       example:
 *         _id: "5f8d0d55b54764421b7156d8"
 *         user: "5f8d0d55b54764421b7156d7"
 *         category: "5f8d0d55b54764421b7156d4"
 */

module.exports = router;