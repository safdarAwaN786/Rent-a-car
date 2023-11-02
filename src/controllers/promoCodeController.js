const PromoCode = require('../models/promoCodeModel');


const addCode = async (req, res) => {
    try {

        const codeExist = await PromoCode.findOne({ code: req.body.code })

        if (codeExist) {
            res.status(201).json({ message: "Code Exists !" });
        } else {



            const promoCode = new PromoCode(req.body)
            await promoCode.save();

            console.log('Code saved..');

            res.status(200).send({ status: true, message: "The Code is added!", data: promoCode });
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ status: false, message: error.message });
    }
}


const deleteCode = async (req, res) => {

  
    try {
      
  
    
      const deletedCode = await PromoCode.findByIdAndDelete(req.params.codeId);
  
      console.log('Deleted successfully!');
      return res.status(200).send({
        status: true,
        message: 'The Code is Deleted!',
        data: deletedCode
      });
    } catch (error) {
      console.error('Error Deleting code:', error);
      return res.status(500).send({ status: false, message: 'Internal server error' });
    }
  };
  

const getCode = async (req, res) => {
    try {

        const requiredCode = await PromoCode.findOne({ code: req.params.codeName })
        console.log(requiredCode);

        if(requiredCode){

            console.log('Code Found..');
            
            res.status(200).send({ status: true, message: "The Code is found!", data: requiredCode });
        } else {
            res.status(201).send({ status: false, message: "The Code does not Exist!", });
        }

    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
}

const getCodes = async (req, res) => {
    try {

        const requiredCode = await PromoCode.find()


        console.log('Code Found..');
        console.log(requiredCode);

        res.status(200).send({ status: true, message: "The Code is found!", data: requiredCode });

    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
}



module.exports = { addCode, getCode, getCodes, deleteCode }