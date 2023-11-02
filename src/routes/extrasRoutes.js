const express = require('express');
const router = express.Router();
const extrasController = require('../controllers/extrasController')

router.post('/update-extra', extrasController.updateExtra);

router.get('/read-extras', extrasController.getExtras);



module.exports = router;