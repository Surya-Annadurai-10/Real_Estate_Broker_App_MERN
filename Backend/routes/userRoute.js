const express = require("express");
const userRouterController = require("../controllers/userRouterController");
const verifyMiddleware = require("../middlewares/verify");
const deleteRouterController = require("../controllers/deleteRouterController");
const GetListingController = require("../controllers/GetListingController");
const GetUserController = require("../controllers/GetUserController");

const userRouter = express.Router();

userRouter.post("/update/:id",verifyMiddleware, userRouterController)
userRouter.delete("/delete/:id" , verifyMiddleware ,deleteRouterController )
userRouter.get("/getuser/:id" , verifyMiddleware ,GetUserController )

userRouter.get("/userlisting/:id",verifyMiddleware,GetListingController);
module.exports = userRouter;