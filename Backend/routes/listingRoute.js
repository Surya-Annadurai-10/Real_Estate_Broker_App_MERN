const express = require("express");
const ListingController = require("../controllers/CreateListingController");
const verifyToken = require("../middlewares/verifyToken");
const DeleteListingController = require("../controllers/DeleteLisitingController");

const listingRouter = express.Router();

listingRouter.post("/create",verifyToken,ListingController);
listingRouter.delete("/delete/:id",verifyToken,DeleteListingController);


module.exports = listingRouter;