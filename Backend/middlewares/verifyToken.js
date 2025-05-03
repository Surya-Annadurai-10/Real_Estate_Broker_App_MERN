const jwt = require("jsonwebtoken");
const errorUtils = require("../utlis/errorUtils");

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

module.exports = verifyToken;