const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const multer = require('multer');

const upload = multer();

router.post('/add-vehicle', upload.single('vehicleImage'), vehicleController.addVehicle);


router.get('/read-vehicles', vehicleController.readVehicles);


router.post('/edit-vehicle/:vehicleId', upload.single('vehicleImage'), vehicleController.editVehicle);
router.delete('/delete-vehicle/:vehicleId', vehicleController.deleteVehicle);



module.exports = router;
