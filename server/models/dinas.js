const mongoose = require("mongoose");
const { ObjectId } = require("bson");

const dinasSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate(value) {
      if (!value) {
        throw new Error("Name is required");
      }
    },
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Dinas = mongoose.model("Dinas", dinasSchema);
// class Dinas {
//   static create(payload) {
//     return getDatabase().collection("dinas").insertOne(payload);
//   }
// }

module.exports = Dinas;
