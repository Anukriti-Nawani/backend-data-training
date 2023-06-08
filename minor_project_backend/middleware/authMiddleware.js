const jwt = require("jsonwebtoken");
require("dotenv").config();

// Authentication middleware
exports.authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(req.headers)
console.log("token", token);
  if (!token) {
    return res.status(401).json({ message: "Authorization token not found" });
  }
  try {
    jwt.verify(
      token.split(" ")[1],
      process.env.ACCESS_TOKEN_SECRET, 
      (err, decoded) => {
        if (err) {
          console.log("err", err);
          res.status(401);
          throw new Error("Not authorized, token failed.");
        }
        console.log(decoded);
        // If the token has expired, throw an error
        // if (Date.now() >= decodedToken.exp * 1000) {
        //   throw new Error('Token expired');
        // }
    
        req.user = {
          userId: decoded.userId,
        };
        console.log(req.user);
        next();
      }
    );


   
  } catch (error) {
    console.log("error", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
