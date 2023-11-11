const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/vehicleCategory');

router.post('/add-category', categoryController.addCategory);
router.get('/read-categories', categoryController.getCategories);

module.exports = router;