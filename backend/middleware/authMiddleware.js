import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = (req, res, next) => {
  const token = req.query.token;

  // Retrieve token from request parameters

  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: "Invalid token" });
    }

    // Attach user information to the request object for further use
    req.user = decoded;
    next();
  });
};