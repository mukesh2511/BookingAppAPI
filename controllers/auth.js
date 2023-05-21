import user from "../models/user.js";
import bcrypt from "bcryptjs";
import createError from "../utils/Error.js";
import jwt from "jsonwebtoken";

//register
export const register = async (req, res, next) => {
  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new user({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(201).json("User created succesfully");
  } catch (err) {
    next(err);
  }
};

//login
export const login = async (req, res, next) => {
  try {
    const userPresent = await user.findOne({ username: req.body.username });

    if (!userPresent) return next(createError(404, "User not found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      userPresent.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong username or password"));

    const token = jwt.sign(
      {
        id: userPresent._id,
        isAdmin: userPresent.isAdmin,
      },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = userPresent._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
