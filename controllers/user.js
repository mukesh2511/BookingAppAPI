import user from "../models/user.js";

//update
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await user.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

//delete
export const deleteUser = async (req, res, next) => {
  try {
    await user.findByIdAndDelete(req.params.id);
    res.status(200).json("user deleted successfully");
  } catch (err) {
    next(err);
  }
};

// getUser
export const getUser = async (req, res, next) => {
  try {
    const userPresent = await user.findById(req.params.id);
    res.status(200).json(userPresent);
  } catch (err) {
    next(err);
  }
};

// getAllUsers
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await user.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
