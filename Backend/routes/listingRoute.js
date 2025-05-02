const express = require("express");
const ListingController = require("../controllers/ListingController");
const verifyToken = require("../middlewares/verifyToken");
const listingRouter = express.Router();

listingRouter.post("/create",verifyToken,ListingController);


module.exports = listingRouter;