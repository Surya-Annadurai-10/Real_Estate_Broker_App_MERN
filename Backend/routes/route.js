const express = require("express");
const SignUpController = require("../controllers/SignUpController");
const LoginController = require("../controllers/LoginController");
const GoogleController = require("../controllers/GoogleController");
const router = express.Router();

router.post("/signup" ,SignUpController );
router.post("/login" , LoginController); 
router.post("/google" , GoogleController); 

module.exports = router