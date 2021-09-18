const { jwtVerify } = require("../helpers/jwt");
const Dinas = require("../models/dinas");

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
        // console.log(req.user);
        next();
      } else {
        throw { name: "IdNotVerified" };
      }
    } else {
      throw { name: "NoAccessToken" };
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { dinasAuth };
