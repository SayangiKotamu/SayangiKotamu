const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: [true, "Rating is required"],
    },
    comment: {
        type: String,
        required: [true, "Comment is required"],
    },
    report: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    dinas: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dinas",
    },
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
