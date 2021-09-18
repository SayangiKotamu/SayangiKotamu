const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
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
  const user = this;
  if (!user.isModified("password")) return next();
  user.password = hashPassword(user.password);

  // ! EMAIL TOKEN
  const emailToken = jwt.sign(
    { NIK: user.NIK, email: user.email, password: user.password },
    process.env.JWT_EMAIL_ACTIVATE,
    { expiresIn: "30m" }
  );

  user.activateEmailToken = emailToken;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_NODEMAILER,
      pass: process.env.PASSWORD_EMAIL_NODEMAILER,
    },
  });

  let mailOptions = {
    from: "noreply@gmail.com",
    to: `${user.email}`,
    subject: "Verification Email",
    html: `<h1>Verification Email </h1> \n <p>Here is your token <a>${emailToken}</a></p>`,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error");
    } else {
      console.log("email sent");
    }
  });
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
