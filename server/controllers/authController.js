const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const OTP = require("../models/otpModel");
const sendOtp = require("../utils/sendOtp");

// Step 1: User initiates signup (OTP sent)
exports.initiateSignup = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    if (!name || !email || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Send OTP
    const response = await sendOtp(email);
    if (!response.success) {
      return res.status(500).json({ message: "OTP sending failed" });
    }

    // Store session data temporarily
    req.app.locals.tempUser = { name, email, role };

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("❌ Error in initiateSignup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Step 2: Verify OTP and create user
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    // Validate OTP
    const validOtp = await OTP.findOne({ email, otp });
    if (!validOtp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Retrieve session data
    const tempUser = req.app.locals.tempUser;
    if (!tempUser || tempUser.email !== email) {
      return res
        .status(400)
        .json({ message: "Session expired. Restart signup" });
    }

    // Save user to DB
    const { name, role } = tempUser;
    const user = new User({ name, email, role, isVerified: true });
    await user.save();

    // Clear temporary session data
    req.app.locals.tempUser = null;

    res.status(201).json({ message: "✅ User registered successfully" });
  } catch (error) {
    console.error("❌ Error in verifyOtp:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Step 3: Login using OTP
exports.login = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    // Validate OTP
    const validOtp = await OTP.findOne({ email, otp });
    if (!validOtp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.error("❌ Error in login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
