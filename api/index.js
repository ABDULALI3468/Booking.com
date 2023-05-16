import express from "express";
const app = express();
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"; // AS WE DOING DEFAULT EXPORT CAN NAME IT WHATEVER BU REMEMBER WE NEED TO ADD .JS AT END WHEN USING COMMON JS MODULES
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
dotenv.config();

import cookieParser from "cookie-parser";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("CONNECTED TO MONGO DB");
  } catch (error) {
    throw error;
  }
};

// mongoose.connection.on("disconnected", () => {
//   console.log("mongoDB disconnected");
// });

mongoose.connection.on("connected", () => {
  console.log("mongoDB connected");
});

app.use(cookieParser());
app.use(express.json());

//middlewares

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8080, () => {
  connect();
  console.log("BISMILLAH WORKING MASHALLAH");
});
