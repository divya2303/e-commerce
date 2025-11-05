// utils/Emails.js
const SibApiV3Sdk = require("@getbrevo/brevo");

// ✅ Create instance
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// ✅ Set API key correctly
const apiKey = process.env.PASSWORD; // make sure this env var exists
apiInstance.authentications["apiKey"].apiKey = apiKey;

// ✅ Send email function
exports.sendMail = async (to, subject, text) => {
  try {
    const sendSmtpEmail = {
      sender: { email: "divyaguptadg365@gmail.com.com", name: "Your App Name" },
      to: [{ email: to }],
      subject: subject,
      textContent: text,
    };

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
};
