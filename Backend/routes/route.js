const express = require("express");
const SignUpController = require("../controllers/SignUpController");
const LoginController = require("../controllers/LoginController");
const router = express.Router();

router.post("/signup" ,SignUpController );
router.post("/login" , LoginController); 

module.exports = router