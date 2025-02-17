const axios = require("axios");
const OTP = require("../models/otpModel");

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const sendOtp = async (email) => {
  const otp = generateOtp();

  // Save OTP in database
  await OTP.create({ email, otp });

  const brevoApiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.SENDER_EMAIL;

  const data = {
    sender: { email: senderEmail, name: "MERN App" },
    to: [{ email }],
    subject: "Your OTP Code",
    textContent: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
  };

  try {
    await axios.post("https://api.brevo.com/v3/smtp/email", data, {
      headers: {
        "api-key": brevoApiKey,
        "Content-Type": "application/json",
      },
    });

    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    console.error(
      "❌ Error sending OTP:",
      error.response?.data || error.message
    );
    return { success: false, message: "OTP sending failed" };
  }
};

module.exports = sendOtp;
