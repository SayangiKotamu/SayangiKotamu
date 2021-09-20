const mongoose = require("mongoose");
const validator = require("validator");

const aspirationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  type: {
    type: String,
    required: [true, "Type is required"],
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

const Aspiration = mongoose.model("Aspiration", aspirationSchema);

module.exports = Aspiration;
