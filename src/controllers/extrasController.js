const Extra = require('../models/extrasModel');


const updateExtra = async (req, res) => {
   
    try {

        

        const updatedExtras = await Extra.findByIdAndUpdate(req.body._id, req.body, {
            new: true,
          });
        

          console.log(updatedExtras);

        res.status(200).send({
            status: true, message: "The Extra is Updated!", data: updatedExtras

        });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
}


const getExtras = async (req, res) => {

    
    try {
        const allExtras = await Extra.findOne();
        

        console.log(allExtras);


        res.status(200).send({
            status: true, message: "The Extras are :", data: allExtras
        });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
}
// const getExtrasByGroup = async (req, res) => {

//     console.log(req.params);
//     console.log('extras getting');
//     try {
        
//         const groupExtras = await Extra.findOne({groupName : req.params.groupName});
//         console.log(groupExtras);


//         res.status(200).send({
//             status: true, message: "The Extras are :", data: groupExtras
//         });
//     } catch (error) {
//         res.status(400).send({ status: false, message: error.message });
//     }
// }

module.exports = { updateExtra, getExtras} 