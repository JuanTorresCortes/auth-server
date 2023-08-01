// Import the required models: Todo and User
const Todo = require("../model/Todo");
const User = require("../model/User");

// Function to get all todo's for a specific user
const getAllTodos = async (req, res) => {
  try {
    // Extract the user ID from the decoded JWT token stored in the response locals
    const user = res.locals.decodedToken.userId;

    // Find all todo's in the Todo model where the 'owner' field matches the user ID
    const allTodos = await Todo.find({ owner: user });

    // Respond with the found todo's in a JSON format with a success flag
    res.status(200).json({ success: true, data: allTodos });
  } catch (error) {
    // If an error occurs during the database operation or processing, handle it here
    console.log(error);
    res.status(500).json({ success: false, message: "error", error: error });
  }
};

// Function to create a new todo for a specific user
const createTodo = async (req, res) => {
  try {
    // Extract the user ID from the decoded JWT token stored in the response locals
    const user = res.locals.decodedToken.userId;

    // Prepare the todo data from the request body
    const todoData = {
      owner: user, // Set the owner as the user ID
      title: req.body.title, // Extract the title from the request body
      description: req.body.description, // Extract the description from the request body
      priority: req.body.priority, // Extract the priority from the request body
    };

    // Create a new Todo instance using the prepared data
    const newTodo = await new Todo(todoData);

    // Save the new todo to the database
    const savedTodo = await newTodo.save();

    // Find the User in the User model and update the 'todos' field by adding the newTodo's ID to it
    const updateUser = await User.findOneAndUpdate(
      { _id: user }, // Find the user with the user ID
      { $push: { todos: newTodo._id } } // Add the newTodo's ID to the 'todos' array
    );

    // Save the updated user information
    await updateUser.save();

    // Respond with the created todo in a JSON format with a success flag
    res.status(200).json({ success: true, data: savedTodo });
  } catch (error) {
    // If an error occurs during the database operation or processing, handle it here
    console.log(error);
    res.status(500).json({ success: false, message: "error", error: error });
  }
};

// Function to update a specific todo
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    // Destructure the userId from decodedToken object
    const { userId } = res.locals.decodedToken;

    req.body.lastModified = Date.now();
    if (req.body.completed) {
      req.body.completedDate = Date.now();
    }
    console.log(req.body);
    // Find the todo with the given ID in the Todo model
    const findTodo = await Todo.findOne({ _id: id });

    // Check if the owner of the found todo matches the user ID from the JWT token
    if (findTodo.owner !== userId) {
      // If the owner does not match, return an unauthorized status with a failure message
      return res.status(401).json({ success: false, message: "Error" });
    }

    // If the owner matches, update the todo with the new data from the request body
    const updateTodo = await Todo.findOneAndUpdate({ _id: id }, req.body);

    // Respond with the updated todo in a JSON format with a success flag
    res.status(200).json({ success: true, data: updateTodo });
  } catch (error) {
    // If an error occurs during the database operation or processing, handle it here
    console.log(error);
    res.status(500).json({ success: false, message: "Error", error: error });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = res.locals.decodedToken;
    const findTodo = await Todo.findOne({ _id: id });
    if (findTodo.owner !== userId) {
      return res.status(401).json({
        success: false,
        message: "Error",
        error: { user: "Not authorized" },
      });
    }
    const deleteTodo = await Todo.findOneAndDelete({ _id: id });
    await User.findOneAndUpdate({ _id: userId }, { $pull: { todos: id } });
    res.status(200).json({ success: true, data: deleteTodo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error", error: error });
  }
};

// Export the functions to be used in other parts of the application
module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
