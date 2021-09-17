const mongoose = require("mongoose");
const { ObjectId } = require("bson");

const dinasSchema = new mongoose.Schema({
  name: {
    type: [Number],
    required: [true, "Name is required array"],
    // validate:
    // validate() {
    //   if (value !== typeof Number) {
    //     throw { name: "NotNumber" };
    //   }
    // },
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
