const ListingModel = require("../models/listingModel");
const errorUtils = require("../utlis/errorUtils");

const GetListingController = async (req , res , next) =>{
    console.log(req.user.id , req.params.id);
    
     if(req.user.id == req.params.id){
       try {
        const listing = await ListingModel.find({userRef: req.params.id});

        res.status(200).json({
            success : true,
            message : "Listing fetched successfully !!",
            data : listing
        })
       } catch (error) {
        next(error)
       }
     }else{
        next(errorUtils(401 , "You can only view your own listing !"))
     }
}

module.exports = GetListingController