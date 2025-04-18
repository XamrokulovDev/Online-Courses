const { Router } = require('express');
const router = Router();

const {
    register,
    login,
    logout
} = require('../controllers/user.controller');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication APIs
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *                 example: 'john_doe'
 *               email:
 *                 type: string
 *                 description: The email of the user
 *                 example: 'john_doe@example.com'
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: 'password123'
 *               confirmPassword:
 *                 type: string
 *                 description: The confirmation password
 *                 example: 'password123'
 *     responses:
 *       201:
 *         description: User successfully registered
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
 *                   example: "User successfully registered"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The user's ID
 *                       example: "5f8d0d55b54764421b7156d4"
 *                     username:
 *                       type: string
 *                       description: The user's username
 *                       example: 'john_doe'
 *                     email:
 *                       type: string
 *                       description: The user's email
 *                       example: 'john_doe@example.com'
 *                     role:
 *                       type: string
 *                       description: The user's role (user, teacher, admin)
 *                       example: 'user'
 *                     apiKey:
 *                       type: string
 *                       description: The user's unique API key
 *                       example: 'abcdefg-1234567'
 *       400:
 *         description: Missing or invalid fields
 *       409:
 *         description: Username or email already registered
 */
router.post('/register', register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *                 example: 'john_doe'
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: 'password123'
 *     responses:
 *       200:
 *         description: User logged in successfully
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
 *                   example: "User logged in successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The user's ID
 *                       example: "5f8d0d55b54764421b7156d4"
 *                     username:
 *                       type: string
 *                       description: The user's username
 *                       example: 'john_doe'
 *                     email:
 *                       type: string
 *                       description: The user's email
 *                       example: 'john_doe@example.com'
 *                     role:
 *                       type: string
 *                       description: The user's role (user, teacher, admin)
 *                       example: 'user'
 *                     token:
 *                       type: string
 *                       description: The JWT token
 *                       example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjc2ZjU4YTJmYzQxZmNiNzM5ODg5MTFkYjQiLCJyb2xlIjoidXNlciJ9.X4dhwNJoXI99RkKw0gsFfbGoTYdqMIpWmtjl3by-MZo'
 *       400:
 *         description: Missing or invalid fields
 *       401:
 *         description: Invalid username or password
 */
router.post('/login', login);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
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
 *                   example: "User logged out successfully"
 *       401:
 *         description: Unauthorized, invalid or missing token
 */
router.post('/logout', logout);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

module.exports = router;