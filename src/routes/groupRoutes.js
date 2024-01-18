const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const multer = require('multer');

const upload = multer();

router.post('/add-group', upload.single('vehicleImage'), groupController.addGroup);


router.get('/read-groups', groupController.readGroups);


router.post('/edit-group/:groupId', upload.single('vehicleImage'), groupController.editGroup);
router.delete('/delete-group/:groupId', groupController.deleteGroup);



module.exports = router;
