const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token Verified Successfully:", verified); // Debugging
    req.user = verified;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message); // Debugging
    res.status(403).json({ error: "Invalid or expired token." });
  }
}

module.exports = authenticateToken;
