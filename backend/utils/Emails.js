const nodemailer = require("nodemailer");
const SibApiV3Sdk = require("@getbrevo/brevo");
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
    // Create API instance
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    // Assign your API key from environment variable (PASSWORD)
    apiInstance.apiClient.authentications.apiKey.apiKey = process.env.PASSWORD;

    // Define the email structure
    const sendSmtpEmail = {
      sender: { email: process.env.EMAIL, name: "MERN AUTH SYSTEM" },
      to: [{ email: receiverEmail }],
      subject: subject,
      htmlContent: body,
    };

    // Send email
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("✅ Email sent successfully to:", receiverEmail);
  } catch (error) {
    console.error("❌ Failed to send email:", error?.response?.text || error);
  }
};

