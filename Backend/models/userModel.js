// const mongoose = require("mongoose");
import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        unique : true,
    },
    avatar : {
        type : String,
        default : "https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
    }
},
 {
    timestamps : true
 }
)


const UserModel = new mongoose.model("User" , UserSchema);

export default UserModel;