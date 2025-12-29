const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

if (process.env.NODE_ENV != "production") {
  require('dotenv').config();
}

const dbUrl = process.env.ATLASDB_URL;

main()
    .then(() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log(err);
    })

async function main(){
    await mongoose.connect(dbUrl);
}

const categories = ["Trending", "Rooms", "Iconic Cities", "Mountains", "Castles", "Amazing Pools", "Camping", "Farms", "Arctic", "Boats"];

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: '6952234a6e75f774cc83ec5b',
        geometry: {
            type: "Point",
            coordinates: [0, 0]
        },
        category: "Trending"
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized")
}

initDB();
