var express = require("express"); // Web framework for Node.js
var router = express.Router(); // Router object for defining routes

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" }); // Render the 'index' view with the title 'Express'
});

module.exports = router; // Export the router object
