const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = require("bson");
const { hashSync } = require("bcryptjs");

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
    select: false,
  },
  NID: {
    type: String,
  },
  description: {
    type: String,
  },
  rating: {
    type: Number,
  },
  role: {
    type: Number,
  },
});

// ! HOOKS BEFORECREATE
dinasSchema.pre("save", async function (next) {
  const dinas = this;

  const firstWords = dinas.name.split(" ").map((el) => {
    return el[0].toLowerCase();
  });

  const NID = firstWords.join("") + dinas._id;
  dinas.NID = NID;

  const tokenSigned = hashSync(dinas.password);
  console.log(tokenSigned);
  dinas.password = tokenSigned;

  next();
});

dinasSchema.set("toJSON", {
  transform: (doc, { __v, password, ...rest }, options) => rest,
});

const Dinas = mongoose.model("Dinas", dinasSchema);

module.exports = Dinas;
