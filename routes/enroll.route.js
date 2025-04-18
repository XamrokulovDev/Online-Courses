const { Router } = require('express');
const router = Router();
const { enrollToCategory } = require('../controllers/enroll.controller');
const { protect } = require('../middlewares/auth.middleware');

router.post('/create', protect, enrollToCategory);

module.exports = router;