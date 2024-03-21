import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "Author",
    },
    publicationYear: {
      type: Number,
    },
    pages: {
      type: Number,
    },
    status: { type: String, default: "available" },
  },
  { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);
