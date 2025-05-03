const express = require("express");
const ListingController = require("../controllers/CreateListingController");
const verifyToken = require("../middlewares/verifyToken");
const DeleteListingController = require("../controllers/DeleteLisitingController");
const UpdateListingController = require("../controllers/UpdateListingController");
const EditListingController = require("../controllers/EditListingController");

const listingRouter = express.Router();

listingRouter.post("/create",verifyToken,ListingController);
listingRouter.delete("/delete/:id",verifyToken,DeleteListingController);
listingRouter.post("/update-listing/:id",verifyToken,UpdateListingController);
listingRouter.get("/edit-listing/:id",verifyToken,EditListingController);


module.exports = listingRouter;