import bcrypt from "bcrypt";
import User from "../models/user-model.js";
import { generateUserToken } from "../middlewares/user.middleware.js";

// SIGNUP
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = await generateUserToken(newUser._id);

    return res.status(201).json({
      status: true,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      token,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "User not found" });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res
        .status(400)
        .json({ status: false, message: "Password is incorrect" });
    }

    const token = await generateUserToken(user._id);

    return res.status(200).json({
      status: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};

// LOGOUT
export const logout = async (req, res) => {
  try {
    if (!req.token) {
      return res.status(401).json({ error: "You are already logged out" });
    }

    // Optional: store invalidated tokens in a blacklist DB if needed
    return res.status(200).json({ success: "User logged out successfully!" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "An error occurred while logging out" });
  }
};
