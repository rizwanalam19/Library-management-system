import router from "../router/book.route.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Book } from "../models/book.model.js";
import { Author } from "../models/author.model.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { ApiError } from "../utils/ApiError.js";

const bookCreate = asyncHandler(async (req, res) => {
  // console.log("Request body ka",req.body,"Ip address",req.ip);
  const id = req.params.id;
  const author_details = await Author.findById(id);
  const author_id = author_details.id;
  if (!author_details) {
    throw new ApiError(500, "Author not found");
  }
  const { title, publicationYear, pages, status } = req.body;

  const book = await Book.create({
    title,
    author: author_id,
    publicationYear,
    pages,
    status,
  });

  return res
    .status(201)
    .json(new ApiResponse(200, book, "Book registered successfully"));
});

const bookData = asyncHandler(async (req, res) => {
  const bookdata = await Book.find();
  res
    .status(200)
    .json(new ApiResponse(200, bookdata, "All details fetch sucessfully"));
});

const bookEdit = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedBook = req.body;
  const book = await Book.findByIdAndUpdate(id, updatedBook, {
    new: true,
    runValidators: true,
  });

  if (!book) {
    throw new ApiError(500, "Book not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, book, "Book updated successfully !!!!"));
});

const bookDelete = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const book = await Book.deleteOne({ _id: id });

  if (!book) {
    throw new ApiError(500, "Book not found");
  }
  res.status(200).json(new ApiResponse(200, book, "Book Delete sucessfully!!"));
});

const bookFilter = asyncHandler(async (req, res) => {
  const { publicationYear, status, author, title, pages } = req.query;
  console.log(req.query);

  let filter = {};
  // if (authorname) filter.authorname = authorname;
  const author_details = await Author.findOne({ authorname: author });
  console.log("Author Name: ", author_details?.authorname);
  //    if (!author_details) {
  //     // Handle the case where the author is not found
  //     throw new ApiError(400, "Author not found")
  // }

  if (pages) filter.pages = pages;
  if (status) filter.status = status;
  if (author) filter.author = author_details.id;
  if (publicationYear) filter.publicationYear = publicationYear;
  if (title) filter.title = title;
  console.log("Filter: ", filter);
  const books = await Book.find(filter);
  console.log("Boook", books);
  if (!books) {
    throw new ApiError(400, "Book not found in filter");
  }
  res
    .status(200)
    .json(new ApiResponse(200, books, "succesfully fetch relevent data !!!!"));
});

export { bookCreate, bookData, bookEdit, bookDelete, bookFilter };
