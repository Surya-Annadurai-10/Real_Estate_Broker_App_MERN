const ListingModel = require("../models/listingModel");
const errorUtils = require("../utlis/errorUtils");

const UpdateListingController = async(req , res , next) =>{
    
    const content = req.body;
    const id = req.params.id

try {
    const listing = await ListingModel.findByIdAndUpdate(id , content , {new : true});
     if(!listing) return next(errorUtils(404 , "Listing not found!"))
    res.status(200).json({
        success : true,
        message : "Listing Updated  successfully!",
        data : listing
    })
} catch (error) {
    
}    
}

module.exports = UpdateListingController;