const mongoose = require("mongoose");

const monthSchema = new mongoose.Schema({

    year: {
        type: Number,
    },
    month: {
        type: Number
    },
    counts: {
        type: Number,
        default: 0
    }
});


module.exports = mongoose.model("AvgReturn", monthSchema);