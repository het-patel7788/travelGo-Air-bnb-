const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default: "https://t3.ftcdn.net/jpg/04/35/91/38/360_F_435913813_Ig6S1gTY4IKxXlHghbiLqsqY4KxJhQbe.jpg",
            set: (v) => (v === "" ? "https://t3.ftcdn.net/jpg/04/35/91/38/360_F_435913813_Ig6S1gTY4IKxXlHghbiLqsqY4KxJhQbe.jpg" : v)
        }
    },
    price: Number,
    location: String,
    country: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }

});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;