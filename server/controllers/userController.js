const User = require("../models/user");
// const {comparePassword} = require('../helpers/bcrypt')
const { jwtSign, jwtVerifyEmailActivate } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");
const { OAuth2Client } = require("google-auth-library");

class UserController {
  static async register(req, res, next) {
    try {
      let newUser = {
        NIK: req.body.NIK,
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
        kota: req.body.kota,
        isActive: false,
        ktp: req.body.ktp,
      };
      const foundEmail = await User.findOne({ email: newUser.email });
      const foundNIK = await User.findOne({ NIK: newUser.NIK });
      if (foundEmail) {
        throw { name: "EmailCollection" };
      } else {
        if (foundNIK) {
          throw { name: "NIKInCollection" };
        } else {
          let data = await User.create(newUser);
          res.status(201).json({ ...newUser, _id: data.insertedId });
        }
      }
    } catch (err) {
      if (!err.errors) {
        next({
          name: err.name,
          message: "Email is already registered",
        });
      } else {
        const toArray = Object.values(err.errors);
        const errMessage = toArray.map((el) => {
          return el.message;
        });
        next({
          name: "userRequired",
          message: errMessage,
        });
      }
    }
  }
  static async login(req, res, next) {
    try {
      const data = await User.findOne({ email: req.body.email });
      if (data) {
        if (data.isActive) {
          if (comparePassword(req.body.password, data.password)) {
            let payload = {
              id: data._id,
              email: data.email,
            };
            let access_token = jwtSign(payload);
            //token belum diset ke database
            res.status(200).json({ access_token });
          } else {
            throw { name: "WrongEmailPassword" };
          }
        } else {
          throw { name: "ActivateAccount" };
        }
      } else {
        throw { name: "WrongEmailPassword" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async activateEmail(req, res, next) {
    const { token } = req.params;
    try {
      const verifiedToken = await jwtVerifyEmailActivate(token);

      if (verifiedToken) {
        const verifiedEmail = await User.findOne({
          email: verifiedToken.email,
        });
        if (verifiedEmail) {
          if (!verifiedEmail.isActive) {
            const updateActive = await User.updateOne(
              { email: verifiedEmail.email },
              { isActive: true }
            );
            res.status(200).json({ message: "Your email has been activated" });
          } else {
            throw { name: "IsActiveTrue" };
          }
        } else {
          throw { name: "EmailTokenInvalid" };
        }
      } else {
        throw { name: "EmailTokenInvalid" };
      }
    } catch (err) {
      next(err);
    }
  }
}
module.exports = UserController;
