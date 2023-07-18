const { isEmpty } = require("validator");

// Routes => checkIfEmpty => controller function
const checkIfEmpty = (req, res, next) => {
  const body = req.body; // {email: "g@gmail.com", password: "Hello8!!"}
  // body["email"] = g@gmail.com
  // body.email
  const errObj = {};

  for (let key in body) {
    // key = email, password
    if (isEmpty(body[key])) {
      errObj[key] = `${key} cannot be empty`;
    }
  }

  // object.keys takes all the key and puts it in an array
  if (Object.keys(errObj).length > 0) {
    return res
      .status(500)
      .json({ success: false, message: "Error", error: errObj });
  } else {
    next();
  }
};

module.exports = {
  checkIfEmpty,
};
