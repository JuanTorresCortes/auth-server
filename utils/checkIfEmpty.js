// Explanation:
// This file defines a middleware function (checkIfEmpty) responsible for checking if any data fields in the request body are empty before processing the request in the backend.
// It uses the validator library's isEmpty function to check each field's value in the request body.
// If any data field is found to be empty, the middleware returns a response with an error object containing the specific field that is empty.
// If all data fields are non-empty, the middleware calls the next() function to proceed to the next middleware or route handler.

const { isEmpty } = require("validator"); // Validator library for data validation

// Middleware to check if any data fields are empty
const checkIfEmpty = (req, res, next) => {
  const body = req.body; // Request body { email: "g@gmail.com", password: "Hello8!!" }
  const errObj = {}; // Object to store validation errors

  // Iterate over each key in the request body
  for (let key in body) {
    // If the value is empty, add an error message for the key
    if (isEmpty(body[key])) {
      errObj[key] = `${key} cannot be empty`;
    }
  }

  // If there are any validation errors, return a response with the error object
  if (Object.keys(errObj).length > 0) {
    return res.status(500).json({
      success: false,
      message: "Error",
      error: errObj,
    });
  } else {
    next(); // If there are no validation errors, proceed to the next middleware
  }
};

module.exports = {
  checkIfEmpty,
};
