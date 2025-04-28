const mongoose = require("mongoose");
const { type } = require("os");

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
    }
},
 {
    timestamps : true
 }
)


const UserModel = new mongoose.model("User" , UserSchema);

module.exports = UserModel;