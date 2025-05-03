// const bcrypt = require("bcrypt");
// const UserModel = require("../models/userModel");
// const errorUtils = require("../utlis/errorUtils");
import bcrypt from "bcrypt"
import UserModel from "../models/userModel.js";
import errorUtils from "../utlis/errorUtils.js";

const SignUpController = async(req , res , next) =>{
    console.log(req.body , "body");
    const user = {
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    }
   try {
    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(req.body.password , salt);
    await UserModel.create({
        ...user,
        password : hashedPassword
    })
    res.status(200).json({
        success : true,
        message : "User Created successfully !!",
        data : user
    })
   } catch (error) {
     next(error);
   }
}

export default SignUpController;