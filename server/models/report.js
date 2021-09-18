const mongoose = require("mongoose");
const validator = require("validator");

const reportSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.Decimal128,
  },
  lat: {
    type: mongoose.Schema.Types.Decimal128,
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
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;

// class ReportUser {
//   static findAll() {
//     return getDatabase().collection("ReportUser").find().toArray();
//   }

//   static async findByCategory(category) {
//     try {
//       let data = await getDatabase()
//         .collection("ReportUser")
//         .findOne({ category: category });
//       return data;
//     } catch (error) {
//       return {
//         name: "Not Found",
//         message: error,
//       };
//     }
//   }

//   static addReport(payload) {
//     return getDatabase().collection("ReportUser").insertOne(payload);
//   }

//   static editReport(payload, id) {
//     return getDatabase()
//       .collection("ReportUser")
//       .updateOne(
//         {
//           _id: ObjectId(id),
//         },
//         {
//           $set: payload,
//         }
//       );
//   }

//   static deleteReport(id) {
//     return getDatabase()
//       .collection("ReportUser")
//       .deleteOne({ _id: ObjectId(id) });
//   }

//   static deleteDbReport() {
//     return getDatabase().collection("ReportUser").drop();
//   }
// }
