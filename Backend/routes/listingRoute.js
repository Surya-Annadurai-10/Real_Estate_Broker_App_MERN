// const express = require("express");
import express from "express"
import GetListingController from "../controllers/GetListingController.js";
import DeleteListingController from "../controllers/DeleteLisitingController.js"
import UpdateListingController from "../controllers/UpdateListingController.js"
import EditListingController from "../controllers/UpdateListingController.js"
// const ListingController = require("../controllers/CreateListingController");
// const verifyToken = require("../middlewares/verifyToken");
// const DeleteListingController = require("../controllers/DeleteLisitingController");
// const UpdateListingController = require("../controllers/UpdateListingController");
// const EditListingController = require("../controllers/EditListingController");
import verifyToken from "../middlewares/verifyToken.js"
import SearchController from "../controllers/SearchController.js";

const listingRouter = express.Router();

listingRouter.post("/create",verifyToken,GetListingController);
listingRouter.delete("/delete/:id",verifyToken,DeleteListingController);
listingRouter.post("/update-listing/:id",verifyToken,UpdateListingController);
listingRouter.get("/edit-listing/:id",verifyToken,EditListingController);
listingRouter.get("/search" , SearchController )

export default listingRouter;