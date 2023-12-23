const express = require('express');
const router = express.Router();
const seasonController = require('../controllers/seasonController')


router.post('/add-season', seasonController.addSeason);
router.get('/read-seasons', seasonController.getSeason);
router.patch('/update-season', seasonController.updateSeason);
router.patch('/remove-season', seasonController.removeSeason);

module.exports =  router;