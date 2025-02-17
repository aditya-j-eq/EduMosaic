const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // 5 min expiry
});

// Debugging Schema Middleware
otpSchema.pre("save", function (next) {
  console.log("✅ OTP about to be saved:", this);
  next();
});

module.exports = mongoose.model("OTP", otpSchema);
