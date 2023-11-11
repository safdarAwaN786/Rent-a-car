const mongoose = require('mongoose');

const seasonSchema = new mongoose.Schema({
    Seasons: [
        {
            seasonName: {
                type: String,
            },
            startDate: {
                type: Date
            },
            endDate: {
                type: Date
            }
        }
    ]
});

const Season = mongoose.model('season', seasonSchema);

module.exports = Season;