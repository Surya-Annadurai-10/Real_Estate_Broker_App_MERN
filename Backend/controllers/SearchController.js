import ListingModel from "../models/listingModel.js";

const SearchController = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;
    if (offer == undefined || offer == false) {
      offer = { $in: [false, true] };
    }

    //  console.log(offer , "offer");

    let furnished = req.query.furnished;

    if (furnished == undefined || furnished == false) {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking == undefined || parking == false) {
      parking == { $in: [false, true] };
    }

    let type = req.query.type;

    if (type == undefined || type == "all") {
      type = { $in: ["sale", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";
    console.log(searchTerm, "searchTerm");
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    //  const listings = await ListingModel.find({
    //     name : {$regex : searchTerm, $options : "i"},
    //     type,
    //     offer,
    //     furnished,
    //     parking
    //  }).sort({
    //     [sort] : order
    //  }).limit(limit).skip(startIndex)

    const listings = await ListingModel.find({
    //   name : {$regex : searchTerm , $options : "i"},
      furnished,
      type,
      parking,
    //   offer
    }).sort({
           [sort] : order
          }).limit(limit).skip(startIndex)

    return res.status(200).json({
      success: true,
      message: "search listings fetched successfully",
      listings,
    });
  } catch (error) {
    next(error);
  }
};

export default SearchController;
