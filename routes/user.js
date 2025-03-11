const express = require("express");
const {
  handleUserSignup,
  handleUserLogin,
  handleUserUpdate,
} = require("../controller/user");
const authenticateToken = require("../middleware/auth");

const router = express.Router();
router.post("/Signup", handleUserSignup);
router.post("/login", handleUserLogin);
router.get("/profile", authenticateToken, (req, res) => {
  res.json({ message: "Welcome to your profile", user: req.user });
});
router.put("/update", authenticateToken, handleUserUpdate); // 🔥 Update User API (Protected)

module.exports = router;
