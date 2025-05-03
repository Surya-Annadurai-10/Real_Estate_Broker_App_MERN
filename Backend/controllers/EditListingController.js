// const ListingModel = require("../models/listingModel");
// const errorUtils = require("../utlis/errorUtils");

import ListingModel from "../models/listingModel.js";
import errorUtils from "../utlis/errorUtils.js";

const EditListingController = async(req , res , next) =>{

try {
    
    const listing = await ListingModel.findById(req.params.id);
    if(!listing) return next(errorUtils(404 , "Listing not Found!"));

    if(req.user.id != listing.userRef) return next(errorUtils(404 , "User Unauthorized"))

    res.status(200).json({
        success : true,
        message : "Edited successfully",
        data : listing
    })   
} catch (error) {
    next(error);
} 
}
export default EditListingController;