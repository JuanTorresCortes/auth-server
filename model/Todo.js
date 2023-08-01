const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const todoSchema = new mongoose.Schema({
  _id: { type: String, default: uuid }, // The user ID is a string and is generated using the uuid library.
  owner: { type: String, ref: "user", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  completedDate: { type: Date },
  completed: { type: Boolean, default: false },
  lastModified: { type: Date, default: Date.now },
  createdAT: { type: Date, default: Date.now },
});

const Todo = mongoose.model("todo", todoSchema); // Create a MongoDB model named "Todo" based on the defined todoSchema.

module.exports = Todo; // Export the Todo model to be used in other parts of the application.
