// const express = require("express");
// const userRouterController = require("../controllers/userRouterController");
// const verifyMiddleware = require("../middlewares/verify");
// const deleteRouterController = require("../controllers/deleteRouterController");
// const GetListingController = require("../controllers/GetListingController");
// const GetUserController = require("../controllers/GetUserController");
import express from "express"
import verifyMiddleware from "../middlewares/verify.js"
import userRouterController from "../controllers/userRouterController.js"
import deleteRouterController from "../controllers/deleteRouterController.js"
import  GetUserController from "../controllers/GetUserController.js"
import GetListingController from "../controllers/GetListingController.js"

const userRouter = express.Router();

userRouter.post("/update/:id",verifyMiddleware, userRouterController)
userRouter.delete("/delete/:id" , verifyMiddleware ,deleteRouterController )
userRouter.get("/getuser/:id" , verifyMiddleware ,GetUserController )
userRouter.get("/userlisting/:id",verifyMiddleware,GetListingController);
export default userRouter;