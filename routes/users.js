// Explanation:
// This file defines the backend user routes using the express.Router() object. It provides a way to handle different HTTP methods and URLs related to user actions.
// The file imports user controller functions from usersController.js, which will be executed when a specific route is accessed.
// The middleware functions, validateData, checkIfEmpty, and jwtMiddleware, are imported from the respective utility files. These middle wares will be executed before processing the request in the corresponding routes.
// The route handlers are defined for different endpoints:
// GET /users: This route returns a simple response with the text "respond with a resource." It acts as a placeholder for listing users but is not implemented in this code.
// POST /users/register: This route handles user registration. It first runs the checkIfEmpty middleware to check if the required data (email and password) is provided in the request body. Then, it runs the validateData middleware to validate the email and password format. If everything is valid, the register controller function is called to create a new user in the database.
// POST /users/login: This route handles user login. It follows a similar pattern as the register route, using the checkIfEmpty and validateData middle wares to ensure the required data is provided and in the correct format. If valid, the login controller function is called to authenticate the user and generate a JWT token for subsequent authorization.
// GET /users/validate: This route is a protected route that requires the user to be authenticated. It uses the jwtMiddleware to verify the authenticity of the incoming request using the JWT token. If the token is valid, the validateUser controller function is called to provide information about the validated user.
// This file sets up the routes and their respective middle wares, allowing the backend to handle user registration, login, and validation in a secure and organized manner.

var express = require("express"); // Web framework for Node.js
var router = express.Router(); // Router object for defining routes

const {
  createUser,
  loginUser,
  validateUser,
} = require("../controllers/usersController"); // Import user controller functions

const { validateUserData } = require("../utils/validateUserData"); // Import data validation middleware
const { checkIfEmpty } = require("../utils/checkIfEmpty"); // Import data check middleware
const { jwtValidate } = require("../utils/jwtValidate"); // import jwt
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource"); // Return a response with the text "respond with a resource"
});

router.post("/register", checkIfEmpty, validateUserData, createUser); // Register route with checkIfEmpty and validateData middle wares, and register controller function
router.post("/login", checkIfEmpty, validateUserData, loginUser); // Login route with checkIfEmpty and validateData middle wares, and login controller function
router.get("/validate", jwtValidate, validateUser); // Validate route with jwtMiddleware middleware and validateUser controller function

module.exports = router; // Export the router object
