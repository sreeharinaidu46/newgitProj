const mongoose = require("mongoose");

const AverageDateSchema = new mongoose.Schema({
    title: {
        type: String
    },
    average: {
        type: Number

    },
    author: {
        type: String,

    },

    publisher: {
        type: String,

    },
    countss: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("AvgDate", AverageDateSchema);