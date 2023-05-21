import hotel from "../models/hotel.js";
import Room from "../models/room.js";

//create
export const createHotel = async (req, res, next) => {
  const newHotel = new hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

//update
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

//delete
export const deleteHotel = async (req, res, next) => {
  try {
    await hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel deleted successfully");
  } catch (err) {
    next(err);
  }
};

// getHotel
export const getHotel = async (req, res, next) => {
  try {
    const Hotel = await hotel.findById(req.params.id);
    res.status(200).json(Hotel);
  } catch (err) {
    next(err);
  }
};

// get all hotels
export const getAllHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;

  try {
    const Hotels = await hotel
      .find({
        ...others,
        cheapestPrice: { $gt: min | 1, $lt: max || 999 },
      })
      .limit(req.query.limit);

    res.status(200).json(Hotels);
  } catch (err) {
    next(err);
  }
};

//countByCity
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");

  try {
    const list = await Promise.all(
      cities.map((city) => {
        return hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

//countByCity
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await hotel.countDocuments({ type: "hotel" });
    const appartmentCount = await hotel.countDocuments({ type: "appartment" });
    const resortCount = await hotel.countDocuments({ type: "resort" });
    const villasCount = await hotel.countDocuments({ type: "villas" });
    const cottagesCount = await hotel.countDocuments({ type: "cottages" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "appartment", count: appartmentCount },
      { type: "resort", count: resortCount },
      { type: "villas", count: villasCount },
      { type: "cottages", count: cottagesCount },
    ]);
  } catch (err) {
    next(err);
  }
};

//gethotelrooms

export const getHotelRooms = async (req, res, next) => {
  try {
    const Hotel = await hotel.findById(req.params.id);
    const list = await Promise.all(
      Hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
