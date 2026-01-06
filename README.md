# TravelGo

A full-stack vacation rental platform designed to replicate core features of major booking sites like Airbnb. This project focuses on backend architecture, server-side rendering, and managing complex database relationships between users, listings, and reviews.

## 🚀 Project Overview

* **Goal:** Build a robust monolithic application using the MVC (Model-View-Controller) design pattern.
* **Architecture:** Server-side rendered pages using EJS for fast initial load times and SEO optimization.
* **Database:** MongoDB Atlas handles flexible data structures for property listings and user reviews.

## 🛠️ Technology Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | HTML5, CSS3, Bootstrap 5, EJS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose ODM |
| **Maps** | TomTom API (Geocoding & Display) |
| **Storage** | Cloudinary (Image Management) |
| **Auth** | Passport.js (Local Strategy) |

## ✨ Key Features

* **Full CRUD Operations:** Hosts can Create, Read, Update, and Delete property listings with ease.
* **Geolocation & Maps:** Addresses are automatically geocoded to coordinates and displayed on interactive TomTom maps.
* **Review System:** Authentication-locked review system allowing guests to rate stays and leave comments.
* **User Authentication:** Secure signup and login functionality with session persistence using Passport.js.
* **Image Uploads:** Seamless image uploading directly to Cloudinary storage.

## 📦 Run Locally

Follow these steps to get the project running on your machine.

1.  **Clone the Repository**

    ```bash

    git clone [https://github.com/het-patel7788/travelGo.git](https://github.com/het-patel7788/travelGo.git)

    cd travelGo

    ```



2.  **Install Dependencies**

    ```bash

    npm install

    ```



3.  **Setup Environment Variables**

    Create a file named `.env` in the root folder and add your credentials:

    ```text

    CLOUD_NAME=your_cloud_name

    CLOUD_API_KEY=your_key

    CLOUD_API_SECRET=your_secret

    TOMTOM_API_KEY=your_tomtom_key

    ATLASDB_URL=your_mongodb_url

    SECRET=your_session_secret

    ```



4.  **Run the Server**

    ```bash

    node app.js

    ```

    The app will run at: http://localhost:3000 in this make this more better and do it again

