const mongoose = require("mongoose");
const validator = require("validator");

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  status: {
    type: String,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  issuedDate: {
    type: Date,
  },
  finishedDate: {
    type: Date,
  },
  location: {
    type: String,
  },
  // ! LATER: CARI TAHU LAGI
  long: {
    type: Number,
  },
  lat: {
    type: Number,
  },
  category: {
    type: String,
  },
  picture: {
    type: String,
  },
  upVote: {
    type: Number,
  },
  downVote: {
    type: Number,
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

// ! LATER: UBAH ADD REPORT
// reportSchema.pre("updateOne", async function (next) {
//   const report = this;

//   if (report.status === "selesai") {
//     report.finishedDate = new Date();
//   }
//   next();
// });

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
