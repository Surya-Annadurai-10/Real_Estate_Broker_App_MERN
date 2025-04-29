const express = require("express");
const SignUpController = require("../controllers/SignUpController");
const router = express.Router();

router.post("/signup" ,SignUpController );

module.exports = router