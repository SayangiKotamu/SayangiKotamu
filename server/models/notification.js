const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  description: {
    type: String,
  },
  date: {
    type: Date,
  },
  user: {
    type: String,
  },
  report: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Report",
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
