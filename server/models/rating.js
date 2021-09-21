const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: [0, "You should give a rating"],
    max: [5, "You can only give max 5 point rating"],
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
