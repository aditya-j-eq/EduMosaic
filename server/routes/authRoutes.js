const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Define routes
router.post("/signup/initiate", authController.initiateSignup);
router.post("/signup/verify", authController.verifyOtp);
router.post("/login", authController.login);

module.exports = router;
