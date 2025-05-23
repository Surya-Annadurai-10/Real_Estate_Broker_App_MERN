// const UserModel = require("../models/userModel");
// const jwt = require("jsonwebtoken");
// const bcrypt = require ("bcrypt");
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import UserModel from "../models/userModel.js";

const GoogleController =async (req , res , next) =>{
   try {
    const {username , email ,password, avatar} = req.body;
    const user = await UserModel.findOne({email : email});
    //if the user exits we need to login the user 
    // otherwise we need to create the user and login 
    if(user){
        const payload = {
            username : user.username,
            email : user.email,
            id : user._id
        }
        const options = {
            expiresIn : "1d"
        }
        const token = jwt.sign(payload , process.env.JWT_SECRET_KEY, options);
        res.cookie('access_token',token,{httpOnly : true});
        const {password : pass , ...rest} = user._doc;

        res.status(200).json({
            success : true,
            message : "Login successful !!",
            data : rest
        })
    }else{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);
        const googleUserData = {
            username : username,
            email : email,
            avatar : avatar,
            password : hashedPassword
        } 

        console.log(googleUserData , "googleUserdata");
        

       const googleUser= await UserModel.create(googleUserData);
        const payload = {
            username :username,
            email : email
        }
        const options = {
            expiresIn : "1d"
        }
        const token = jwt.sign(payload , process.env.JWT_SECRET_KEY, options);
        res.cookie('access_token',token,{httpOnly : true});
        // const user = await UserModel.findOne({email : email});
        // const send = {...googleUserData, id : user._id}
        const {password : pass , ...rest} = googleUser
        if (user){
            console.log({
                success : true,
                message : "Authenticated successfully",
                data : rest,
               
            });
            
            res.status(200).json({
                success : true,
                message : "Authenticated successfully",
                data : rest,
                id : user._id
            })
        }
        
    }
   } catch (error) {
        next(error)
   }
}


export default GoogleController;