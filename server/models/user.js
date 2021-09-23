const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const validator = require("validator");
const { hashPassword } = require("../helpers/bcrypt");
const { jwtSignEmailActivate } = require("../helpers/jwt");
const mailer = require("../helpers/nodemailer");

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
  // ! ADDING MINIMAL LENGTH
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
  ktp: {
    type: String,
    required: [true, "KTP is required"],
  },
  reports: [],
  aspirations: [],
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  user.password = hashPassword(user.password);

  // ! EMAIL TOKEN
  const emailToken = jwtSignEmailActivate({
    NIK: user.NIK,
    email: user.email,
    password: user.password,
  });

  user.activateEmailToken = emailToken;
  try {
    let node = await mailer(user.email, emailToken);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
