const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");

if (process.env.NODE_ENV === "development") {
  mongoose.connect("mongodb://localhost:27017/SayangiKotamu");
} else {
  mongoose.connect("mongodb://localhost:27017/SayangiKotamu-test");
}
