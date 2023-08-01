// Explanation:
// This file defines a middleware function (validateData) responsible for validating data received in the request body before processing it in the backend.
// It uses the validator library to perform two types of validation:
// Validate whether the email field is a valid email format using isEmail.
// Validate whether the password field meets the strong password requirements using isStrongPassword.
// If any validation errors are found, the middleware returns a response with an error object containing the specific validation errors.
// If there are no validation errors, the middleware calls the next() function to proceed to the next middleware or route handler.

const { isEmail, isStrongPassword } = require("validator"); // Validator library for data validation

const validateUserData = (req, res, next) => {
  const { email, password } = req.body; // Destructure email and password from the request body

  const errObj = {}; // Object to store validation errors

  if (!isEmail(email)) {
    errObj.email = "Please enter a valid email"; // Add an error message if the email is not valid
  }
  if (!isStrongPassword(password)) {
    errObj.password =
      "Your password must contain 1 lowercase, 1 uppercase, 1 number, 1 special character, and be at least 8 characters long"; // Add an error message if the password is not strong
  }

  //Object.keys takes all the key and puts it in an array
  if (Object.keys(errObj).length > 0) {
    return res
      .status(401)
      .json({ success: false, message: "Error", error: errObj });
  } else {
    next(); // If there are no validation errors, proceed to the next middleware
  }
};

module.exports = {
  validateUserData,
};
