import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
  updateRoomAvailability,
  updateroom,
} from "../controllers/room.js";

const router = express.Router();

// Create
router.post("/:hotelid", verifyAdmin, createRoom);

// Update
router.put("/:id", verifyAdmin, updateroom);

router.put("/availability/:id", updateRoomAvailability);

//Delete
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

// Get
router.get("/:id", getRoom);

//Get All
router.get("/", getAllRooms);

export default router;
