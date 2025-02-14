const User = require("../models/user-model");

// async function handleUserSignup(req, res) {
//   try {
//     const { name, email, password } = req.body;

//     await User.create({
//       name,
//       email,
//       password,
//     });

//     return res.status(200).json({
//       status: "success",
//       message: "User logged in successfully!",
//       data: { name: name, email: email },
//     });
//   } catch (error) {
//     console.error("Signup Error:", error);
//     return res.status(500).send("Something went wrong!");
//   }
// }

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
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) return res.send({ error: "invaild username or passowrd" });
  return res.send("login successfull");
}

module.exports = { handleUserSignup, handleUserLogin };
