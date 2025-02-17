const OTP = require("../models/otpModel");
const axios = require("axios");

const sendOtp = async (email) => {
  try {
    const senderEmail = process.env.SENDER_EMAIL;
    const apiKey = process.env.BREVO_API_KEY;

    if (!senderEmail || !apiKey) {
      throw new Error("Missing Brevo API key or sender email.");
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Debug: Print OTP before saving
    console.log("Generated OTP:", otp);

    // Save OTP in the database
    const otpEntry = await OTP.findOneAndUpdate(
      { email },
      { email, otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    console.log("Stored OTP in DB:", otpEntry);

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { email: senderEmail },
        to: [{ email }],
        subject: "Your OTP Code",
        htmlContent: `<p>Your OTP is: <strong>${otp}</strong></p>`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      }
    );

    return { success: true };
  } catch (error) {
    console.error(
      "❌ Error sending OTP:",
      error.response?.data || error.message
    );
    return { success: false, error: error.response?.data || error.message };
  }
};

module.exports = sendOtp;
