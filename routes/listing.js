const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isowner, validateListing} = require("../middleware.js");
const multer  = require('multer')
const listingController = require("../controllers/listings.js");
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })

router
    .route("/")
    //index route
    .get(wrapAsync(listingController.index))
    //create route
    .post(
        isLoggedIn,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.createListing));


//new route
router.get("/new", 
    isLoggedIn, 
    listingController.renderNewForm);

    
router.route("/:id")
    //show route
    .get(wrapAsync(listingController.showListing))
    //update route
    .put(
        isLoggedIn,
        isowner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.updateListing))
    //delete route
    .delete(
        isLoggedIn,
        isowner,
        wrapAsync(listingController.destroyListing));


//edit route
router.get(
    "/:id/edit",
    isLoggedIn,
    isowner,
    wrapAsync(listingController.renderEditForm))

module.exports = router;