const Season = require('../models/seasonModel');
const Group = require('../models/groupModel')


const addSeason = async (req, res) => {
    try {
        const season = new Season(req.body);
        await season.save();

        const groups = await Group.find();
        groups.map(async (groupObj) => {
            groupObj.prices.push({
                season: season._id
            })
            await Group.findByIdAndUpdate(groupObj._id, groupObj)
        })
        res.status(200).send({
            status: true, message: "The Season is added!", data: season
        });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
}


const getSeason = async (req, res) => {
    try {
        const season = await Season.find()
        res.status(200).send({
            status: true, message: "The Seasons are :", data: season
        });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
}

const updateSeason = async (req, res) => {
    try {
        const updatedSeason = await Season.findByIdAndUpdate(req.body._id, req.body, {
            new: true,
        });
        res.status(200).send({
            status: true, message: "The Extra is Updated!", data: updatedSeason
        });
    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
}


const removeSeason = async (req, res) => {
    try {
        const deletedSeason = await Season.findByIdAndDelete(req.body._id);

        const groups = await Group.find();
        groups.map(async (groupObj) => {
            groupObj.prices.filter(priceObj => priceObj.season._id !== deletedSeason._id)
            await Group.findByIdAndUpdate(groupObj._id, groupObj)
        })

        res.status(200).send({
            status: true, message: "The Season is Removed :", data: deletedSeason
        });

    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
}


module.exports = { addSeason, getSeason, updateSeason, removeSeason }