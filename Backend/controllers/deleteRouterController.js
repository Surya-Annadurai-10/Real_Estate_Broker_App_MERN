// const UserModel = require("../models/userModel");
// const errorUtils = require("../utlis/errorUtils");

import UserModel from "../models/userModel.js";
import errorUtils from "../utlis/errorUtils.js";

const deleteRouterController = async (req, res, next) => {
  const id = req.params.id;
  console.log(id, "id");

  try {
     UserModel.findByIdAndDelete(id)
    .then((deletedUser) => console.log(deletedUser))
    .catch((Err) => console.log("error while deleting the using", Err));
    // const result = await UserModel.findByIdAndDelete(id);
    res.clearCookie("access_token");
    res.status(200).json({
      success: true,
      message: "User deleted successfully!!",
    });
  } catch (error) {
    next(error);
  }
};

export default deleteRouterController;
