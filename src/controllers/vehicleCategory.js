const Category = require('../models/vehicleCategory');

const addCategory = async (req, res)=>{
    try {
        
        
        const newCategory = new Category(req.body);
        
        newCategory.save();
        res.status(200).send({
            status: true, message: "The group is added!", data: newCategory
        });
        
    } catch (error) {
        console.log(error)
        res.status(400).send({ status: false, message: error.message });
    }
}


const getCategories = async (req, res)=>{
    try {
        
        
        const categories = Category.find();
        
        
        res.status(200).send({ status: true, message: "The Categories are found!", data: categories });
        
    } catch (error) {
        console.log(error)
        res.status(400).send({ status: false, message: error.message });
    }
}


module.exports = {addCategory, getCategories}