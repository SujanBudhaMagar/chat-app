import jwt from "jsonwebtoken";
import User from "../model/User.js";
import { ENV } from "../lib/env.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.headers.cookie
      ?.split(";")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (!token) {
      console.log("Socket connection rejected: No token provided");
      return next(new Error("Unauthorized - No Token provided"));
    }

    //verify the token
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) {
      console.log("Socked connection rejected: Invalid token");
      return next(new Error("Unauthorized - Invalid token"));
    }

    // find user from db
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("Socked connection rejected: Invalid token");
      return next(new Error("User not found"));
    }

    //attach user info to socket
    socket.user = user;
    socket.userId = user._id.toString();

    console.log(
      `Socket authenticated for user: ${user.fullName} (${user._id})`
    );
    next();
  } catch (error) {
    console.log("Error in socked authentication:", error.message);
    next(new Error("Unauthorized - Authentication failed"));
  }
};
