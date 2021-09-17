const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/SayangiKotamu");

// ! CHANGE TO MONGOOSE
// // Connection URL
// const url = "mongodb://localhost:27017";
// const client = new MongoClient(url);

// // Database Name
// const dbName = "SayangiKotamu";

// let db;

// function connect(callback) {
//   client.connect((err) => {
//     if (err) {
//       console.log(err);
//       //   callback(err)
//     } else {
//       console.log(`success`);
//       db = client.db(dbName);
//       //   callback(null)
//     }
//   });
// }

// function getDatabase() {
//   return db;
// }

// module.exports = { connect, getDatabase };
