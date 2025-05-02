const ListingModel = require("../models/listingModel");

const ListingController = async (req , res , next) =>{
       try {
         await ListingModel.create(req.body)
         res.status(200).json({
            succes : true,
            message : "Lisiting created successfully",
            data : req.body
         })

       } catch (error) {
          next(error)
       }
       
}

module.exports = ListingController;