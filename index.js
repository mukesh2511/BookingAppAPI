import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/Auth.js";
import usersRoute from "./routes/Users.js";
import hotelsRoute from "./routes/Hotels.js";
import roomRoute from "./routes/Rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected ");
});

// middlewares

app.use(express.json());
const allowedOrigins = ["https://mybookingclient.onrender.com"];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/room", roomRoute);
app.use("/api/users", usersRoute);

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
app.listen(8000, () => {
  connect();
  console.log("Connected to backend ");
});
