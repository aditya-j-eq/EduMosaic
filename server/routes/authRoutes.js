const express = require("express");
const router = express.Router();
const {
  initiateSignup,
  verifyOtp,
  initiateLogin,
  verifyLoginOtp,
} = require("../controllers/authController"); //  Make sure this is the correct path

// Routes for Signup
router.post("/signup", initiateSignup);
router.post("/verify-otp", verifyOtp);

// Routes for Login
router.post("/login/send-otp", initiateLogin);
router.post("/login/verify-otp", verifyLoginOtp);

module.exports = router;
