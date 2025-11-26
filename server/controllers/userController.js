import createHttpError from "http-errors";
import User from "../models/userModal.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(createHttpError(400, "Please Fill in all credentials"));
    }
    const user = await User.find({ email });
    if (user) {
      return next(createHttpError(400, "User Already Exists"));
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword, name });
    await newUser.save();

    const payload = { id: newUser._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.status(201).json({
      message: "User Created Successfully",
      token,
      user: {
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (error) {
    console.log(error.message);
    next(createHttpError(500, error.message));
  }
};
export const login = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return next(createHttpError(400, "Please Fill in all credentials"));
    }
    const user = await User.find({ email });
    if (!user) {
      return next(createHttpError(400, "Invalid Credentials"));
    }
    const hashedPassword = await bcrypt.compare(password, user.password);

    if (!hashedPassword) {
      return next(createHttpError(400, "Invalid Credentials"));
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.status(201).json({
      message: "User Logged in Successfully",
      token,
      user: {
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (error) {
    console.log(error.message);
    next(createHttpError(500, error.message));
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    return res.status(200).json({
      message: "User Fetched Successfully",
      user,
    });

    res.status(200);
  } catch (error) {
    next(createHttpError(500, "Internal Server Error"));
  }
};
