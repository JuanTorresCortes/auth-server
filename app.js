// Explanation:
// This file is the entry point of the backend application.
// It imports the required modules, including Express, MongoDB connection module (mongooseConnect), and routers for handling different routes.
// The application is created using express().
// Middleware functions are set up to handle various tasks such as logging, parsing request data, handling CORS, etc.
// Two routers, indexRouter and usersRouter, are registered to handle routes for the root URL and "/users" URL, respectively.
// A custom error handler is added to catch and handle errors and render an error page when necessary.
// The Express application is exported to be used in other parts of the application.

var createError = require("http-errors"); // Module for creating HTTP errors
var express = require("express"); // Web framework for Node.js
var path = require("path"); // Module for working with file paths
var cookieParser = require("cookie-parser"); // Parses cookies attached to the incoming request
var logger = require("morgan"); // HTTP request logger middleware
const cors = require("cors"); // Cross-Origin Resource Sharing middleware
require("dotenv").config(); // Loads environment variables from a .env file

const { mongooseConnect } = require("./mongoose"); // Custom module for connecting to MongoDB using Mongoose
mongooseConnect(); // Connect to the MongoDB database

var indexRouter = require("./routes/index"); // Router for handling requests to the root URL
var usersRouter = require("./routes/users"); // Router for handling requests to the "/users" URL
const todosRouter = require("./routes/todos");

var app = express(); // Creating an Express application

// view engine setup
app.set("views", path.join(__dirname, "views")); // Set the directory for views
app.set("view engine", "ejs"); // Set EJS as the view engine

app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(logger("dev")); // Log HTTP requests in the development mode
app.use(express.json()); // Parse JSON in request bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data in request bodies
app.use(cookieParser()); // Parse cookies attached to the request
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the "public" directory

app.use("/", indexRouter); // Register the indexRouter middleware at the root URL
app.use("/users", usersRouter); // Register the usersRouter middleware at the "/users" URL
app.use("/todos", todosRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404)); // If no matching route is found, create a 404 error
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message; // Error message
  res.locals.error = req.app.get("env") === "development" ? err : {}; // Error details in the development environment

  // render the error page
  res.status(err.status || 500); // Set the HTTP status code
  res.render("error"); // Render the "error" view using the configured view engine
});

module.exports = app; // Export the Express application
