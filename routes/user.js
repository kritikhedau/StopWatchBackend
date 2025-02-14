const express = require("express");
const { handleUserSignup, handleUserLogin } = require("../controller/user");

const router = express.Router();
router.post("/", handleUserSignup);
router.post("/Login", handleUserLogin);

module.exports = router;
