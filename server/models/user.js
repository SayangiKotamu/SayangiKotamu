const nodemailer = require("nodemailer");
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
    console.log(node, "--------");
    next(node);
  } catch (error) {
    console.log(error, "erooorrrrrrr");
    next(error);
  }
  // .then(() => {
  //   next();
  // })
  // .catch((err) => {
  //   next(err);
  // });
  // let transporter;
  // if (
  //   process.env.NODE_ENV === "development" ||
  //   process.env.NODE_ENV === "production"
  // ) {
  //   transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //       user: process.env.EMAIL_NODEMAILER,
  //       pass: process.env.PASSWORD_EMAIL_NODEMAILER,
  //     },
  //   });
  //   let mailOptions = {
  //     from: "noreply@gmail.com",
  //     to: `${user.email}`,
  //     subject: "Verification Email",
  //     html: `<h1>Verification Email </h1> \n <p>Please <a href='${process.env.URL}/${emailToken}'>click here</a> to activate your email</p>`,
  //   };

  //   transporter.sendMail(mailOptions, function (err, data) {
  //     // ! LATER: DI ERROR HANDLER
  //     if (err) {
  //       next({ name: "EmailError" });
  //     } else {
  //       console.log("email sent");
  //       next();
  //     }
  //   });
  // } else {
  //   next();
  // }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
