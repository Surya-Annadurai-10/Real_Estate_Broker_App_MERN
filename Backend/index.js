const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = require("./routes/authRoute");
const errorMiddleware = require("./middlewares/error");
const userRouter = require("./routes/userRoute");
const cookieParser = require("cookie-parser");


dotenv.config();
const app = express();
app.use(express.json())
app.use(cookieParser());
app.use("/api/auth",router);
app.use("/api/user",userRouter);
app.use(errorMiddleware);


mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("db connected successfully"))
  .catch((err) => console.log("Error while connecting to db" , err));

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("Error while Listening to the Port: ", process.env.PORT);
  } else {
    console.log("Started listening to the Port:", process.env.PORT);
  }
});
