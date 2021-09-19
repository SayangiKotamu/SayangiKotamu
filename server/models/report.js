const mongoose = require("mongoose");
const validator = require("validator");
const Notification = require("../models/notification");
const Dinas = require("../models/dinas");

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
  long: {
    type: Number,
  },
  lat: {
    type: Number,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
    required: [true, "Category is required"],
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
    required: [true, "User is required"],
  },
  dinas: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dinas",
    required: [true, "Dinas is required"],
  },
});

// ! LATER: UBAH ADD REPORT
reportSchema.pre("updateOne", async function (next) {
  if (this.options.change === "ChangeStatus") {
    const modifiedField = this.getUpdate();

    const foundDinas = await Dinas.findOne({ _id: modifiedField.dinas })
      .select("-reports")
      .select("-aspirations");

    let process =
      modifiedField.status === "diproses"
        ? "sedang ditangani"
        : "sudah selesai ditangani";

    const payload = {
      description: `Laporan kamu dengan nama ${modifiedField.title} ${process} oleh ${foundDinas.name}`,
      date: new Date(),
      user: modifiedField.user,
    };
    await Notification.create(payload);
  }

  next();
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
