import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    author: String,
  },
  { timestamps: true } // 👈 Automatically adds and manages `createdAt` & `updatedAt`
);

export default mongoose.model("Blog", blogSchema);
