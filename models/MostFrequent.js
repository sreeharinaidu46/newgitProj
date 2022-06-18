const mongoose = require("mongoose");

const RecentSchema = new mongoose.Schema({
    accession_no: {
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
    countBooks: {
        type: Number
    }
}, { timestamps: true });

module.exports = mongoose.model("MostFrequent", RecentSchema);