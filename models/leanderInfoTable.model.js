import mongoose from "mongoose";
import { Student } from "./student.model.js";
import { Book } from "./book.model.js";
const leanderSchema = mongoose.Schema({
    book:{
        type: mongoose.Types.ObjectId,
        ref: "Book"
    }, 
    student:{
        type: mongoose.Types.ObjectId,
        ref: "Student"
    }

}, {timestamps: true});

export const LeanderBook = mongoose.model("LeanderBook", leanderSchema);