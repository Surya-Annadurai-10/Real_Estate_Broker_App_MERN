const ListingModel = require("../models/listingModel");
const errorUtils = require("../utlis/errorUtils");

const DeleteListingController = async(req , res , next) =>{
    const listingId = req.params.id;
   console.log(listingId , "listingId");
   
   try {
    const listingData =  await ListingModel.findById(listingId);
   console.log(listingData , "ListingData");
   
    if(!listingData) return next(401 , "Invalid lisitng id")
   console.log(req.user.id , listingData.userRef , "comparison----------------");
   
        if(req.user.id != listingData.userRef) return next(401 , "You can delete only your listings")

            const deleteListing = await ListingModel.findByIdAndDelete(listingId)
            if(deleteListing){
                res.status(200).json({
                    message : "Listing deleted successfully",
                    success : true,
                    data : deleteListing
                 })
            }else{
                next(errorUtils(401 , "No listing data found to delete"))
            }
   } catch (error) {
     next(error)
   }
}

module.exports = DeleteListingController;