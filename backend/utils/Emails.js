const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});


exports.sendMail = async(receiverEmail,subject,body) => {
    await transporter.sendMail({
    from: process.env.EMAIL,
    to: receiverEmail,
    subject: subject,
    html: body
  });
};
