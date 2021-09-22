const nodemailer = require("nodemailer");

async function mailer(email, emailToken) {
  let mailConfig;
  if (
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "development"
  ) {
    // all emails are delivered to destination
    mailConfig = {
      service: "gmail",
      auth: {
        user: process.env.EMAIL_NODEMAILER,
        pass: process.env.PASSWORD_EMAIL_NODEMAILER,
      },
    };
  } else {
    // all emails are catched by ethereal.email
    mailConfig = {
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "daniella.hettinger@ethereal.email",
        pass: "tquEkNk2EnQ9a72Tfw",
      },
    };
  }
  let transporter = nodemailer.createTransport(mailConfig);
  let mailOptions = {
    from: "noreply@gmail.com",
    to: `${email}`,
    subject: "Verification Email",
    html: `<h1>Verification Email </h1> \n <p>Please <a href='${process.env.URL}/${emailToken}'>click here</a> to activate your email</p>`,
  };

  try {
    let result = await transporter.sendMail(mailOptions);

    if (result) {
      return {
        result,
      };
    } else {
      throw { name: "EmailError" };
    }
  } catch (error) {
    return {
      error,
    };
  }
}

module.exports = mailer;
