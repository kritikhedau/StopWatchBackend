const express = require("express");
require("dotenv").config();
const app = express();
const PORT = 3000;
const userRoute = require("./routes/user");

// mongoDb connection

const db = require("./config/mongo-connection.js");
const authenticateToken = require("./middleware/auth.js");

// Middleware to parse JSON
app.use(express.json()); // This is required for req.body to work

app.get("/", authenticateToken, (req, res) => {
  res.status(200);
  res.send("welcome to lucky");
});

app.use("/user", userRoute);

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
