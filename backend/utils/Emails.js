const nodemailer = require("nodemailer");
const Brevo = require("@getbrevo/brevo")

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
    const apiInstance = new Brevo.TransactionalEmailsApi();
    const apiKey = process.env.PASSWORD; // using PASSWORD as Brevo API key
    apiInstance.authentications['apiKey'].apiKey = apiKey;

    const sendSmtpEmail = {
      to: [{ email: receiverEmail }],
      sender: { email: process.env.EMAIL, name: "MERN AUTH SYSTEM" },
      subject: subject,
      htmlContent: body,
    };

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("✅ Email sent successfully to:", receiverEmail);
  } catch (error) {
    console.error("❌ Failed to send email:", error.response?.text || error);
  }
};
