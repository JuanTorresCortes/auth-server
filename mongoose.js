// Explanation:
// This file contains a function (mongooseConnect) responsible for connecting the backend application to the MongoDB database using Mongoose.
// It imports the mongoose module, which is used for MongoDB object modeling and data validation.
// The mongooseConnect function connects to the MongoDB Atlas URI specified in the environment variables (process.env.ATLAS_URI).
// If the connection is successful, it logs a success message; otherwise, it logs any errors that occur during the connection process.
// The function is exported to be used in the index.js file to establish the database connection.

const mongoose = require("mongoose"); // MongoDB object modeling tool

const mongooseConnect = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI); // Connect to the MongoDB Atlas URI specified in the environment variables
    console.log("connected to mongodb ✅"); // Log a success message if the connection is successful
  } catch (error) {
    console.log(error); // Log any errors that occur during the connection process
  }
};

module.exports = {
  mongooseConnect,
};
