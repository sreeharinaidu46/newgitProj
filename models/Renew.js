const mongoose = require("mongoose");

const RenewSchema = new mongoose.Schema({
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
    }
}, { timestamps: true });

module.exports = mongoose.model("Renew", RenewSchema);