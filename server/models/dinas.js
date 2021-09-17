const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = require("bson");

const dinasSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

// ! HOOKS BEFORECREATE
dinasSchema.pre("save", async function (next) {
  const user = this;

  const firstWords = user.name.split(" ").map((el) => {
    return el[0];
  });

  console.log(user);

  next();
});

const Dinas = mongoose.model("Dinas", dinasSchema);
// class Dinas {
//   static create(payload) {
//     return getDatabase().collection("dinas").insertOne(payload);
//   }
// }

module.exports = Dinas;
