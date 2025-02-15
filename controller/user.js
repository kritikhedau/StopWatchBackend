const User = require("../models/user-model");

async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "Email already exists. Please use a different email.",
      });
    }

    await User.create({ name, email, password });

    return res.status(201).json({
      status: "success",
      message: "User signed up successfully!",
      data: { name, email },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error. Please try again later.",
    });
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;

    // Find user by email and password (plaintext matching)
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error. Please try again later.",
    });
  }
}

module.exports = { handleUserSignup, handleUserLogin };
