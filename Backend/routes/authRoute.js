// const express = require("express");
import express from  "express"
import SignUpController from "../controllers/SignUpController.js"
import LoginController from "../controllers/LoginController.js"
import GoogleController from "../controllers/GoogleController.js"
import SignOutController from "../controllers/SignOutController.js"
// const SignUpController = require("../controllers/SignUpController");
// const LoginController = require("../controllers/LoginController");
// const GoogleController = require("../controllers/GoogleController");
// const SignOutController = require("../controllers/SignOutController");
const router = express.Router();

router.post("/signup" ,SignUpController );
router.post("/login" , LoginController); 
router.post("/google" , GoogleController); 
router.get("/signout" , SignOutController); 

export default router