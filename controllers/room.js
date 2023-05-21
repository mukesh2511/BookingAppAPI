import room from "../models/room.js";
import hotel from "../models/hotel.js";
import createError from "../utils/Error.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

//update room
export const updateroom = async (req, res, next) => {
  try {
    const updatedRoom = await room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

//update room availability
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await room.updateOne(
      { "roomNumber._id": req.params.id },
      { $push: { "roomNumber.$.unavailableDates": req.body.date } }
    );
    res.status(200).json("Room status has been updated");
  } catch (err) {
    next(err);
  }
};

//delete room
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await room.findByIdAndDelete(req.params.id);
    try {
      await hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room deleted successfully");
  } catch (err) {
    next(err);
  }
};

// getroom
export const getRoom = async (req, res, next) => {
  try {
    const getroom = await room.findById(req.params.id);
    res.status(200).json(getroom);
  } catch (err) {
    next(err);
  }
};

// get all rooms
export const getAllRooms = async (req, res, next) => {
  try {
    const allrooms = await room.find();
    res.status(200).json(allrooms);
  } catch (err) {
    next(err);
  }
};
