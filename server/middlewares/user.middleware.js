import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { UserToken } from "../models/user-token-model.js";
import User from "../models/user-model.js";

dotenv.config();
export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader ? authHeader.replace("Bearer ", "") : null;

    if (!token) {
      return res.status(401).json({ status: false, message: "Token missing" });
    }

    const tokenData = await UserToken.findOne({ token });

    if (!tokenData) {
      return res.status(401).json({ status: false, message: "Unauthorized user!" });
    }

    const user = await User.findById(tokenData.fk_user).lean();

    if (!user) {
      return res.status(401).json({ status: false, message: "User not found" });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

export const generateUserToken = async (id) => {
  try {
    const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY || "", {
      expiresIn: "1d",
    });

    await UserToken.create({ token, fk_user: id });
    return token;
  } catch (err) {
    console.log(err);
  }
}