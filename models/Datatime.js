const mongoose = require("mongoose");

const ReturnSchema = new mongoose.Schema({
    accession_no: {
        type: String,
    },
    userId: {
        type: String,
    },
    userName: {
        type: String,
    },
    userBranch: {
        type: String,
    },
    bookId: {
        type: String,
    },
    title: {
        type: String,
    },

    author: {
        type: String,
    },

    publisher: {
        type: String,
    },

    year: {
        type: String,
    },

    return_Date: {
        type: Date,
    }
}, { timestamps: true });

module.exports = mongoose.model("Return", ReturnSchema);