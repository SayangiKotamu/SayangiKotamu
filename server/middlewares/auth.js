const { jwtVerify } = require("../helpers/jwt");
const Dinas = require("../models/dinas");
const Report = require("../models/report");
const User = require("../models/user");

async function dinasAuth(req, res, next) {
  const { access_token: accessToken } = req.headers;

  try {
    if (accessToken) {
      const verifiedAcessToken = jwtVerify(accessToken);
      const verifiedId = await Dinas.findOne({
        _id: verifiedAcessToken.id,
      });

      if (verifiedId) {
        req.user = {
          id: verifiedId._id,
          email: verifiedId.email,
          role: verifiedId.role,
        };
        next();
      } else {
        throw { name: "IdNotVerified" };
      }
    } else {
      throw { name: "NoAccessToken" };
    }
  } catch (err) {
    next(err);
  }
}

async function Userauth(req, res, next) {
  const { access_token } = req.headers;
  try {
    if (access_token) {
      const payload = jwtVerify(access_token);
      const verifiedId = await User.findOne({
        _id: payload.id,
      });
      if (verifiedId) {
        req.user = {
          id: verifiedId._id,
          email: verifiedId.email,
          role: verifiedId.role,
        };
        next();
      } else {
        throw { name: "IdNotVerified" };
      }
    } else {
      throw { name: "NoAccessToken" };
    }
  } catch (error) {
    next(error);
  }
}

async function authEmailUser(req, res, next) {
  const { id: userId, email, role } = req.user;

  try {
    const foundUser = await User.findById({ _id: userId });

    if (!foundUser) {
      throw { name: "IdNotVerified" };
    } else {
      if (!foundUser.isActive) {
        throw { name: "ActivateAccount" };
      } else {
        next();
      }
    }
  } catch (err) {
    next(err);
  }
}

// AUTHORIZATION
async function authZDinas(req, res, next) {
  const { id } = req.params;
  const { id: userId, email, role } = req.user;
  try {
    const foundReport = await Report.findOne({ _id: id });
    if (foundReport) {
      if (foundReport.dinas.toString() === userId.toString()) {
        next();
      } else {
        throw { name: "NoAccessReport" };
      }
    } else {
      throw { name: "ReportNotFound" };
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { dinasAuth, Userauth, authZDinas, authEmailUser };
