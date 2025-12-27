const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const mongo_url = 'mongodb://127.0.0.1:27017/travelGO';

main()
    .then(() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log(err);
    })

async function main(){
    await mongoose.connect(mongo_url);
}

const categories = ["Trending", "Rooms", "Iconic Cities", "Mountains", "Castles", "Amazing Pools", "Camping", "Farms", "Arctic", "Boats"];

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: '69157926b365e21d9d492884',
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
