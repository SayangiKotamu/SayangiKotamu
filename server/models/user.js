const { getDatabase } = require("../config/mongoose");
const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const validator = require("validator");
const { hashPassword } = require("../helpers/bcrypt");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "name is required"],
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
  NIK: {
    type: String,
    required: [true, "NIK is required"],
  },
  kota: {
    type: String,
    required: [true, "kota is required"],
  },
  isActive: {
    type: Boolean,
  },
  activateEmailToken: {
    type: String,
  },
  reports: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
    },
  ],
});

userSchema.pre("save", function (next) {
  var user = this;
  if (!user.isModified("password")) return next();
  user.password = hashPassword(user.password);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
