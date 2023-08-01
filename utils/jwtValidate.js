// Explanation:
// This file defines the backend middleware function jwtMiddleware, which is used to verify and decode JSON Web Tokens (JWT) for authentication purposes.
// The middleware is called before processing protected routes, where users need to be authenticated using JWT.
// When a request is made to a protected route, this middleware checks for the presence of the Authorization header in the request's headers.
// If the Authorization header exists, it extracts the token from the header (by removing the "Bearer " prefix) and verifies it using the jwt.verify method. The verification is performed using the secret key stored in the process.env.SECRET_KEY.
// If the token is successfully verified, the decoded token data is stored in the res.locals object. This allows other middleware or route handlers to access the decoded token data.
// If the token verification fails (e.g., invalid or expired token), the middleware catches the error and sends a 401 Unauthorized response with the error information, indicating that the user is not authorized to access the protected route.
// The jwtMiddleware.js file plays a crucial role in ensuring that only authenticated users with valid tokens can access protected routes. It provides an additional layer of security to the backend by verifying the authenticity of the incoming requests.

const jwt = require("jsonwebtoken"); // JSON Web Token library

const jwtValidate = async (req, res, next) => {
  try {
    console.log(req.headers); // Log the request headers for debugging purposes

    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization; // Get the authorization header value
      const slicedToken = token.split(" ")[1]; // Extract the token part by removing the "Bearer " prefix
      const decodedToken = await jwt.verify(
        slicedToken,
        process.env.SECRET_KEY
      ); // Verify and decode the JWT token using the secret key
      // decodedTOken = payload (any info we passed in ), created time and time and expiration time

      if (decodedToken) {
        res.locals.decodedToken = decodedToken; // Store the decoded token in res.locals for future use in other middleware
        next(); // Proceed to the next middleware
        return;
      }
    } else {
      return res.status(401).json({
        success: false,
        message: "error",
        error: { user: "Not authorized" },
      });
    }
  } catch (error) {
    console.log(error); // Log any errors that occur during the token verification process

    res.status(401).json({ success: false, message: "Error", error: error }); // Return a 401 Unauthorized status with the error information
  }
};

module.exports = {
  jwtValidate,
};
