const mongoose = require("mongoose");
const validator = require("validator");

const announcmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  announcment: {
    type: String,
    required: [true, "Announcment is required"],
  },
  date: {
    type: Date,
  },
  dinas: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dinas",
  },
});

const Announcment = mongoose.model("Announcment", announcmentSchema);

module.exports = Announcment;
