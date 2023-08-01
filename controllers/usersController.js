// Explanation:
// This file contains three controller functions responsible for handling user registration, login, and user validation using JWT.
// The register function receives user registration data (email and password), hashes the password using bcrypt, creates a new User instance, and saves it to the MongoDB database.
// The login function receives user login data (email and password), finds the user with the given email in the database, and checks if the password matches the hashed password in the database using bcrypt. If successful, it generates a JWT token for authentication.
// The validateUser function receives a decoded JWT token (res.locals.decodedToken) and finds the user in the database using the decoded user ID from the JWT for user validation.
// The controller functions handle errors and return appropriate responses based on the success or failure of the operations.

const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Controller function to create new user (registration)
const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Generate a random salt and hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const userInfo = {
      email: email,
      passwordHash: hash,
    };

    // Create a new User instance and save it to the database
    const newUser = await new User(userInfo); // grab data
    await newUser.save(); // save to data base

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error", error: error });
  }
};

// Controller function for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user with the given email in the database
    const foundUser = await User.findOne({ email: email });

    // If user not found or password does not match, return an error response
    if (!foundUser) {
      return res.status(401).json({
        success: false,
        message: "User or Password does not match",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      foundUser.passwordHash
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "User or password dose not match" });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ userId: foundUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1hr",
    });

    res.status(200).json({ success: true, token: token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: error.message, error: error });
  }
};

// Controller function for validating user with JWT
const validateUser = async (req, res) => {
  try {
    const decodedToken = res.locals.decodedToken;
    // Find the user in the database using the decoded user ID from the JWT
    const findUser = await User.findOne({ _id: decodedToken.userId });

    if (!findUser) {
      res.status(401).json({
        success: false,
        message: "error",
        error: { user: "User not found" },
      });
    }

    res.status(200).json({ success: true, email: findUser.email });
  } catch (error) {
    res.status(500).json({ success: false, message: "error", error: error });
  }
};

module.exports = {
  createUser,
  loginUser,
  validateUser,
};
