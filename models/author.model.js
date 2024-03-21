import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    authorname: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    exp: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Author = mongoose.model("Author", authorSchema);
