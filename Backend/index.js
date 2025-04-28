const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("db connected successfully"))
  .catch((err) => console.log("Error while connecting to db"));

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("Error while Listening to the Port: ", process.env.PORT);
  } else {
    console.log("Started listening to the Port:", process.env.PORT);
  }
});
