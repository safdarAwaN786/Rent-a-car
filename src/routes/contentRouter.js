const express = require('express')
const router = express.Router();
const  contentController = require('../controllers/webContentController');

router.post('/add-content', contentController.addContent);
router.patch('/update-content', contentController.updateContent);
router.get('/read-content', contentController.getContent);


module.exports =  router;