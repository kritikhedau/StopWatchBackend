const User = require("../models/user-model");
const bcrypt = require("bcrypt"); // Import bcrypt
const jwt = require("jsonwebtoken");

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

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashedPassword });

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
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email }, // Payload (Data inside token)
      process.env.JWT_SECRET, // Secret Key
      { expiresIn: process.env.JWT_EXPIRES_IN } // Expiry Time
    );

    return res
      .status(200)
      .json({ message: "Login successful", status: 1, email: email, token });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error. Please try again later.",
    });
  }
}

async function handleUserUpdate(req, res) {
  try {
    const userId = req.user.userId;
    const { name, email, password } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "email is already in use" });
      }
      user.email = email;
    }
    if (name) {
      user.name = name;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();
    res.status(200).json({
      message: "User updated successfully!",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("updated error", error);
    res.status(500).json({ error: "Interal server error" });
  }
}

module.exports = { handleUserSignup, handleUserLogin, handleUserUpdate };
