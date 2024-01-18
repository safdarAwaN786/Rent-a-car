const express = require('express');
const router = express.Router();
const promoCodeController = require('../controllers/promoCodeController')


router.post('/add-code', promoCodeController.addCode);
router.patch('/update-code', promoCodeController.updatePromoCode);

router.get('/get-code/:codeName/:groupId', promoCodeController.getCode);
router.delete('/delete-code/:codeId', promoCodeController.deleteCode);
router.get('/get-codes', promoCodeController.getCodes);

module.exports =  router