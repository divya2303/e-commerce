// utils/Emails.js
const SibApiV3Sdk = require("@getbrevo/brevo");

// ✅ Initialize Brevo API client
const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.PASSWORD; // environment variable from Render

// ✅ Create transactional email API instance
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// ✅ Send email function
exports.sendMail = async (receiverEmail, subject, body) => {
  try {
    const sendSmtpEmail = {
      sender: { email: process.env.EMAIL, name: "MERN AUTH SYSTEM" },
      to: [{ email: receiverEmail }],
      subject: subject,
      htmlContent: body, // supports HTML content
    };

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("✅ Email sent successfully to:", receiverEmail);
  } catch (error) {
    console.error("❌ Failed to send email:", error?.response?.text || error);
  }
};
