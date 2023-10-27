const express = require('express');
const router = express.Router();
const extrasController = require('../controllers/extrasController')

router.post('/add-extra', extrasController.addExtra);

router.get('/read-extras', extrasController.getExtras);

router.get('/read-extras-by-group/:groupName', extrasController.getExtrasByGroup);

module.exports = router;