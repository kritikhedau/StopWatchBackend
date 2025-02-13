const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const PORT = 3000;
const userRoute = require("./routes/user");

// mongoDb connection

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDb Connected"))
  .catch((error) => console.log("Mongo Error", error));

// Middleware to parse JSON
app.use(express.json()); // This is required for req.body to work

app.get("/", (req, res) => {
  res.status(200);
  res.send("welcome to myssss serversssssssss");
});

app.use("/user", userRoute);

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});

// //  Schema
// const userSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: true,
//   },
//   lastName: {
//     type: String,
//   },
//   email: { type: String, required: true, unique: true },
// });

// const User = mongoose.model("test", userSchema);
