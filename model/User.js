// Explanation:
// This file defines the MongoDB schema and model for the User collection. It will be used to interact with the MongoDB database for user-related operations.
// The mongoose library is used to define the schema and model. Mongoose is a popular MongoDB object modeling tool for Node.js that simplifies working with MongoDB collections and documents.
// The userSchema object represents the structure of a user document in the database. It defines the fields and their data types for a user entry. The fields in the schema are _id, email, passwordHash, and createdAt.
// The _id field is a unique identifier for the user document. It is generated using the uuid library, which provides universally unique identifiers (UUIDs).
// The email field is a required string that stores the user's email. It is expected to be in lowercase, have no leading or trailing spaces, and be unique in the database to avoid duplicate user accounts with the same email.
// The passwordHash field is a required string that stores the hashed version of the user's password. The actual password is never stored in the database for security reasons. Instead, bcrypt or a similar hashing library is used to hash the password before storing it in the database.
// The createdAt field is a Date type that stores the date and time when the user document is created. It has a default value of the current date and time set using Date.now().
// The User model is created using mongoose.model() by passing the name of the model ("user") and the userSchema. This creates a collection named "users" in the MongoDB database to store user documents based on the defined schema.
// Finally, the User model is exported to be used in other parts of the application, such as controllers or routes, to perform CRUD (Create, Read, Update, Delete) operations on the User collection in the database.
// In summary, the User.js file defines the structure of user data in the MongoDB database and provides an interface to interact with the database through the User model. This model will be used by other parts of the application to manage user data, such as user registration and login.

const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const userSchema = new mongoose.Schema({
  _id: { type: String, default: uuid }, // The user ID is a string and is generated using the uuid library.
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  }, // The email field is a required string and is expected to be in lowercase with no leading or trailing spaces. It must be unique in the database.
  todos: [{ type: String, ref: "todo" }],
  passwordHash: { type: String, required: true }, // The passwordHash field is a required string that stores the hashed password of the user.
  createdAt: { type: Date, default: Date.now }, // The createdAt field is a Date type and stores the date and time when the user document is created. It has a default value of the current date and time.
});

const User = mongoose.model("user", userSchema); // Create a MongoDB model named "user" based on the defined userSchema.

module.exports = User; // Export the User model to be used in other parts of the application.
