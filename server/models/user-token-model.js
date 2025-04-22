import mongoose from "mongoose";

const userTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  fk_user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export const UserToken = mongoose.model("UserToken", userTokenSchema);
