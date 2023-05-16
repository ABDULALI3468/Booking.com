import jwt from "jsonwebtoken";
import createError from "./error.js";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
  console.log("Verifying token...");
  const token = req.cookies.access_token;
  if (!token) {
    console.log("Token not present");
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      console.log("Token is not valid");
      return next(createError(403, "Token is not valid!"));
    }
    console.log("Token verified successfully");
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  console.log("Verifying user...");
  verifyToken(req, res, (err) => {
    if (err) console.log("Error in verifying user");
    if (req.user.id === req.params.id || req.user.isAdmin) {
      console.log("User verified successfully");
      next();
    } else {
      console.log("User verification failed");
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) console.log("ERROR IN ADMIN");

    if (req.user.isAdmin === true) {
      console.log("VERIFY ADMIN WORKED");
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
