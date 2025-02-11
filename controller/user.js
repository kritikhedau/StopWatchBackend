const User = require("../models/user-model");

async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    await User.create({
      name,
      email,
      password,
    });

    return res.send("Signup successful!");
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).send("Something went wrong!");
  }
}

module.exports = { handleUserSignup };
