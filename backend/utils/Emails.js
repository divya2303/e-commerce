const nodemailer = require("nodemailer");

// Create transporter for Brevo SMTP
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Optional: verify connection at startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP connection failed:", error);
  } else {
    console.log("✅ SMTP ready to send emails");
  }
});

// Function to send email
exports.sendMail = async (receiverEmail, subject, body) => {
  try {
    await transporter.sendMail({
      from: `"MERN AUTH" <${process.env.EMAIL}>`,
      to: receiverEmail,
      subject,
      html: body,
    });
    console.log("✅ Email sent to:", receiverEmail);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
};
