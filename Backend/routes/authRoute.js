const express = require("express");
const SignUpController = require("../controllers/SignUpController");
const LoginController = require("../controllers/LoginController");
const GoogleController = require("../controllers/GoogleController");
const SignOutController = require("../controllers/SignOutController");
const router = express.Router();

router.post("/signup" ,SignUpController );
router.post("/login" , LoginController); 
router.post("/google" , GoogleController); 
router.get("/signout" , SignOutController); 

module.exports = router