// const express =  require("express");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const router = require("./routes/authRoute");
// const errorMiddleware = require("./middlewares/error");
// const userRouter = require("./routes/userRoute");
// const cookieParser = require("cookie-parser");
// const listingRouter = require("./routes/listingRoute");
// const path = require("path")
import mongoose from "mongoose"
import errorMiddleware from "./middlewares/error.js"
import userRouter from "./routes/userRoute.js"
import router from "./routes/authRoute.js"
import listingRouter from "./routes/listingRoute.js"
import path from "path"
import { fileURLToPath } from "url"
import dotenv from "dotenv"
import express from "express"
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("Error while Listening to the Port: ", process.env.PORT);
  } else {
    console.log("Started listening to the Port:", process.env.PORT);
  }
});


// API Routes
app.use("/api/user", userRouter);
app.use("/api/auth", router);
app.use("/api/listing", listingRouter);

console.log(__dirname , "dirname");


// Static Frontend
app.use(express.static(path.join(__dirname, 'Frontend/react_vite/dist')));

app.get("{0,}", (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend/react_vite/dist/index.html'));
});

// Error Handler must come LAST
app.use(errorMiddleware);



mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("db connected successfully"))
  .catch((err) => console.log("Error while connecting to db" , err));




