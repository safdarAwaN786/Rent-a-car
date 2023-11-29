const Season = require('../models/seasonModel');
const Group = require('../models/groupModel')


const addSeason = async (req, res) => {
    // try {
    //     const season = new Season(req.body);

    //     await season.save();

    //     res.status(200).send({
    //         status: true, message: "The Season is added!", data: season

    //     });


    // } catch (error) {
    //     res.status(400).send({ status: false, message: error.message });

    // }
}


const getSeason = async (req, res) => {
    try {
        console.log('request came');
        const season = await Season.findOne()
            res.status(200).send({
                status: true, message: "The Seasons are :", data: season
            });
       
        console.log(season);

    } catch (error) {
        console.log(error);
        res.status(400).send({ status: false, message: error.message });
    }
}

const updateSeason = async (req, res) => {
    try {

        console.log(req.body);
        const updatedSeason = await Season.findByIdAndUpdate(req.body._id, req.body, {
            new: true,
        });
        console.log(updatedSeason);

        res.status(200).send({
            status: true, message: "The Extra is Updated!", data: updatedSeason
        });

    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
}


module.exports = { addSeason, getSeason, updateSeason }