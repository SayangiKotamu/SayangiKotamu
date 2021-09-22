const nodemailer = require("nodemailer");

async function mailer(email, emailToken) {
  let transporter;
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_NODEMAILER,
      pass: process.env.PASSWORD_EMAIL_NODEMAILER,
    },
  });
  let mailOptions = {
    from: "noreply@gmail.com",
    to: `${email}`,
    subject: "Verification Email",
    html: `<h1>Verification Email </h1> \n <p>Please <a href='${process.env.URL}/${emailToken}'>click here</a> to activate your email</p>`,
  };

  try {
    let result = await transporter.sendMail(mailOptions);
    // ! LATER: DI ERROR HANDLER
    // if (err) {
    //   return new Promise.reject({ name: "EmailError" });
    // } else {
    //   console.log("email sent");
    //   //   next();
    //   return new Promise.resolve();
    // }
    if (result) {
      return {
        result
      };
    } else {
      throw { name: "nodeError" };
    }
  } catch (error) {
    return {
      error,
    };
  }
}

module.exports = mailer;
