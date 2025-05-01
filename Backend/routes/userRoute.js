const express = require("express");
const userRouterController = require("../controllers/userRouterController");
const verifyMiddleware = require("../middlewares/verify");

const userRouter = express.Router();

userRouter.post("/update/:id",verifyMiddleware, userRouterController)

module.exports = userRouter;