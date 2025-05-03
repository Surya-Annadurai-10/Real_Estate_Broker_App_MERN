// const bcrypt= require("bcrypt");
// const UserModel = require("../models/userModel");
// const errorUtils = require("../utlis/errorUtils");
import bcrypt from "bcrypt"
import UserModel from "../models/userModel.js";
import errorUtils from "../utlis/errorUtils.js";

const userRouterController = async(req , res , next) =>{
    try {
        const id = req.params.id;

    if(id != req.user.id) next(errorUtils(401 , "Forbidden"));
   console.log("in userController" , id , req.user.id);
   const user = await UserModel.findByIdAndUpdate(id , {
    $set : {
        username : req.body.username,
        email : req.body.email,
        password : req.body.password,
        avatar : req.body.avatar
    }
   },{new : true})

   const {password : pass , ...rest} = user._doc;

   res.status(200).json({
    success:true,
    message : "Updated successfully",
    data : rest
   })
    } catch (error) {
        next(error)
    }
   
}



export default userRouterController;
