const express = require("express");
const { handleUserSignup, handleUserLogin } = require("../controller/user");
const authenticateToken = require("../middleware/auth");

const router = express.Router();
router.post("/", handleUserSignup);
router.post("/login", handleUserLogin);

router.get("/profile", authenticateToken, (req, res) => {
  res.json({ message: "Welcome to your profile", user: req.user });
});

module.exports = router;
