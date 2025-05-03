// const UserModel = require("../models/userModel");
// const errorUtils = require("../utlis/errorUtils");

import UserModel from "../models/userModel.js";
import errorUtils from "../utlis/errorUtils.js";

const GetUserController = async(req , res , next) =>{
    try {
        const user = await UserModel.findById(req.params.id);
    if(!user) return next(errorUtils(404 , "User Not Found!"))

        const {password : pass , ...rest} = user._doc;
        res.status(200).json({
            success : true,
            message : "User Found successfully",
            data : rest
        })
    } catch (error) {
        next(error);
    }
}
export default GetUserController;