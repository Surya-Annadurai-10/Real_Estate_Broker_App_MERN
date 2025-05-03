// const UserModel = require("../models/userModel");
// const errorUtils = require("../utlis/errorUtils");
// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken"
import errorUtils from "../utlis/errorUtils.js";
import UserModel from "../models/userModel.js";

const verifyMiddleware = async(req , res , next) =>{
    const token = req.cookies.access_token
    console.log(req.cookies, "token===========");
   if(!token) next(errorUtils(401 , "token not present"))
    
    
    jwt.verify(token , process.env.JWT_SECRET_KEY , (err , user) =>{
      if(err) next(errorUtils(401 , "Unauthorized user"))
        console.log(user , "user");
        
       req.user = user;
       next()
    })
 
    
}

export default verifyMiddleware;