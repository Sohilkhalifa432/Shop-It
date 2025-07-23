import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Headers:", req.headers);
  console.log("Authorization Header:", req.headers.authorization);
  

  if (!authHeader) {
    return res
      .status(401)
      .send({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract token from 'Bearer token'
  if (!token) {
    return res.status(401).send({ success: false, message: "Token missing" });
  }

  try {
    const decoded = JWT.verify(token, process.env.jwt_secret);
    req.user = decoded;
    console.log("Decoded JWT:", decoded); // <--- Add this line
    next();
  } catch (error) {
    res
      .status(401)
      .send({ success: false, message: "Invalid or expired token" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== "1") {
      return res.status(401).send({
        success: false,
        message: "Unauthorized access",
      });
    }
    next();
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "Unauthorized access",
    });
    console.log("Admin error:", error);
  }
};
