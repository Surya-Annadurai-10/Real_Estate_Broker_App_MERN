const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = require("./routes/route");
const errorMiddleware = require("./middlewares/error");

dotenv.config();
const app = express();
app.use(express.json())

app.use("/api/auth",router);
app.use(errorMiddleware);

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
