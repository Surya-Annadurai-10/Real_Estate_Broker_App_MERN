const ListingModel = require("../models/listingModel");

const ListingController = async (req , res , next) =>{
       try {
       const listing =  await ListingModel.create(req.body)
       console.log(listing , "Listing created successfully");
       
         res.status(200).json({
            success : true,
            message : "Lisiting created successfully",
            data :listing
         })

       } catch (error) {
          next(error)
       }
       
}

module.exports = ListingController;