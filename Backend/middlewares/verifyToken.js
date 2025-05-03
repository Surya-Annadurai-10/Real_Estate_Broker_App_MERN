// const jwt = require("jsonwebtoken");
// const errorUtils = require("../utlis/errorUtils");

import errorUtils from "../utlis/errorUtils.js";
import jwt from "jsonwebtoken"

const verifyToken = (req , res , next) =>{
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

export default verifyToken;