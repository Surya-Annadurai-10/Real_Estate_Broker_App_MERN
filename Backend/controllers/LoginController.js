// const UserModel = require("../models/userModel");
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken");
// const errorUtils = require("../utlis/errorUtils");
// const dotenv = require("dotenv");

import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import errorUtils from "../utlis/errorUtils.js";
import dotenv from "dotenv"


dotenv.config();

const LoginController = async (req , res , next) =>{
       console.log(req.body , "login");
      
       try {
        const userData = await UserModel.findOne({email : req.body.email});
        if(!userData) {
            next(errorUtils(401 , "User not found !!"))
        }
        const isValid = await bcrypt.compare(req.body.password , userData.password);
        const payload = {
            username  : userData.username,
            email  : userData.email,
            id : userData._id
        }

        const options = {
            expiresIn : "1d"
        }
        const token = jwt.sign(payload , process.env.JWT_SECRET_KEY, options);
        res.cookie("access_token" , token , {httpOnly : true})
        const {password : pass , ...rest} = userData._doc;

        if(isValid){
         res.status(200).json({
             success : true,
             message : "Login successful !!",
             token :token,
             data : rest
            })

        }else{
         next(errorUtils(401 , "Wrong Credentials"))
        //  console.log("401 error block");
         
        }
       } catch (error) {
         next(error);
       }



       
}
export default LoginController;