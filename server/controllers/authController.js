const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const OTP = require("../models/otpModel");
const sendOtp = require("../utils/sendOtp");

// Step 1: Send OTP during signup
exports.initiateSignup = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    if (!name || !email || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const response = await sendOtp(email);
    if (!response.success) {
      return res.status(500).json({ message: "OTP sending failed" });
    }

    req.app.locals.tempUser = { name, email, role };
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("❌ Error in initiateSignup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Step 2: Verify OTP and register user
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const validOtp = await OTP.findOne({ email, otp });
    if (!validOtp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const tempUser = req.app.locals.tempUser;
    if (!tempUser || tempUser.email !== email) {
      return res
        .status(400)
        .json({ message: "Session expired. Restart signup" });
    }

    const { name, role } = tempUser;
    const user = new User({ name, email, role, isVerified: true });
    await user.save();

    req.app.locals.tempUser = null;
    await OTP.deleteOne({ email });

    res.status(201).json({ message: "✅ User registered successfully" });
  } catch (error) {
    console.error("❌ Error in verifyOtp:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Step 3: Send OTP for login
exports.initiateLogin = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const response = await sendOtp(email);
    if (!response.success) {
      return res.status(500).json({ message: "OTP sending failed" });
    }

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("❌ Error in initiateLogin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Step 4: Verify OTP and log in user
exports.verifyLoginOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const validOtp = await OTP.findOne({ email, otp });
    if (!validOtp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    await OTP.deleteOne({ email });

    res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.error("❌ Error in verifyLoginOtp:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
