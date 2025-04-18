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

router.get('/all', protect, getAllCourses);
router.get('/:id', protect, getCourse);
router.post('/create', protect, admin || teacher, upload.single('image'), createCourse);
router.put('/update/:id', protect, admin || teacher, upload.single('image'), updateCourse);
router.delete('/delete/:id', protect, admin || teacher, deleteCourse);

module.exports = router;