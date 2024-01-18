const express = require('express');
const router = express.Router();
const VAT = require('../models/VAT');


router.post('/add-vat', async (req, res)=>{
  
    const { id, value } = req.body;
    try {
        const vatObj = await VAT.findById(id)

        vatObj.value = value;

        await vatObj.save()
        res.status(200).send({status : true});
        
    } catch (error) {
        res.status(500).send('Server Error : ' + error);
    }




});



router.get('/get-vat', async (req, res)=>{
  
    try {
        const vat = await VAT.find();
        res.status(200).send(vat);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }



});

module.exports = router;