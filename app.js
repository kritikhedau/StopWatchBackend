const express = require("express");
const { default: mongoose } = require("mongoose");

const app = express();
const PORT = 3000;
const userRoute = require("./routes/user");

// mongoDb connection

mongoose
  .connect("mongodb://127.0.0.1:27017/stopWatch")
  .then(() => console.log("MongoDb Connected"))
  .catch((error) => console.log("Mongo Error", error));

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
