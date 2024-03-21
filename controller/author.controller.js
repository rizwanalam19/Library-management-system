import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Author } from "../models/author.model.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { ApiError } from "../utils/ApiError.js";

const authorCreate = asyncHandler(async(req, res)=>{
const {authorname, subject, exp} = req.body;

const author = await Author.create({
    authorname, subject, exp
});
return res
.status(201)
.json(new ApiResponse(200, author, "User registered successfully"));

});

const authorData = asyncHandler(async(req, res)=>{
const authordata = await Author.find();
res .status(200).json(new ApiResponse(200, authordata, "Author data fetch successfully !!"))
});

const authorEdit = asyncHandler(async(req, res)=>{
    const { id } = req.params;
    const updateAuthor = req.body;

    const author = await Author.findByIdAndUpdate(id, updateAuthor, { new: true, runValidators: true });

    if (!author) {
        throw new ApiError(500, "Author not found");
      }
      res.status(200).json(new ApiResponse(200, author, "Author is updated sucessfully"));

});

const authorDelete = asyncHandler(async(req, res)=>{
const { id } = req.params;
const author = await Author.deleteOne({_id: id});
if(!author){
    throw new ApiError(500, "Author not found");
}
res.status(200).json(new ApiResponse(200, author, "Author Delete sucessfully!!"))
})

export { authorCreate, authorData, authorEdit, authorDelete }