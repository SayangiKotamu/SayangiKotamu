const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");

// ! Later: Will be ask
if (process.env.NODE_ENV === "development") {
  mongoose.connect("mongodb://localhost:27017/SayangiKotamu");
} else {
  mongoose.connect("mongodb://localhost:27017/SayangiKotamu-test");
}
