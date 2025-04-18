const { Router } = require('express');
const router = Router();

const { 
    getAllCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/category.controller');
const { protect, teacher, admin } = require('../middlewares/auth.middleware');

router.get('/all', protect, getAllCategories);
router.get('/:id', protect, getCategory);
router.post('/create', protect, admin || teacher, createCategory);
router.put('/update/:id', protect, admin || teacher, updateCategory);
router.delete('/delete/:id', protect, admin || teacher, deleteCategory);

module.exports = router;