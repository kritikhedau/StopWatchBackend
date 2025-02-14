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

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) return res.send({ error: "invaild username or passowrd" });
  return res.send("login successfull");
}

module.exports = { handleUserSignup, handleUserLogin };
