const express = require("express");
const userRouterController = require("../controllers/userRouterController");
const verifyMiddleware = require("../middlewares/verify");
const deleteRouterController = require("../controllers/deleteRouterController");

const userRouter = express.Router();

userRouter.post("/update/:id",verifyMiddleware, userRouterController)
userRouter.delete("/delete/:id" , verifyMiddleware ,deleteRouterController )
module.exports = userRouter;