const Listing = require("../models/listing");
const axios = require("axios"); // ADD THIS
const ttAPIKey = process.env.TOMTOM_API_KEY;

module.exports.index = async (req, res) => {
    const { location, country, category } = req.query;

    let query = {};

    if (category) {
        query.category = category;
    }

    if (location) {
        query.location = { $regex: location, $options: "i" };
    }

    if (country) {
        query.country = { $regex: country, $options: "i" };
    }

    const allListings = await Listing.find(query);

    if (allListings.length === 0) {
        req.flash("error", "No listings found matching your search!");
        return res.redirect("/listings");
    }

    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate:{
            path: "author",
        },
    })
    .populate("owner");
    if(!listing){
        req.flash("error", "Your request does not exist!");
        return res.redirect("/listings");  
    }
    console.log(listing)
    res.render("listings/show.ejs", { listing });
}

module.exports.createListing = async (req, res, next) => {
    
    let response = await axios.get(
        `https://api.tomtom.com/search/2/geocode/${req.body.listing.location}.json?key=${ttAPIKey}`
    );

    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    if (response.data.results.length > 0) {
        newListing.geometry = { 
            type: 'Point', 
            coordinates: [
                response.data.results[0].position.lon, 
                response.data.results[0].position.lat
            ]
        };
    } else {
        newListing.geometry = { type: 'Point', coordinates: [0, 0] };
    }

    await newListing.save();
    console.log(newListing);
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Your request does not exist!");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
}