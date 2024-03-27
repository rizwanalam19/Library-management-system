import router from "../router/book.route.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Book } from "../models/book.model.js";
import { Author } from "../models/author.model.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Student } from "../models/student.model.js";
import { LeanderBook } from "../models/leanderInfoTable.model.js";

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

const totalBooks = asyncHandler(async (req, res) => {
  const total_books = await Book.find();

  const total_digits = await Book.countDocuments();
  console.log(total_digits);
  if (!total_books) {
    throw new ApiError(400, "Books not found");
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, total_books, "succesfully fetch relevent data !!!!")
    );
});

const IssueBook = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const student_details = await Student.findById({ _id: id });
  if (!student_details) {
    throw new ApiError(400, "Student not Found !!!");
  }
  console.log("student_details: ", student_details);

  const currentLoanedBooksCount = student_details.books.length;

  if (currentLoanedBooksCount >= 3) {
    // If the student already has 3 books, throw an error
    throw new ApiError(400, "Student cannot loan more than 3 books.");
  }

  const book_to_be_loan = req.body;

  // console.log("book_to_be_loan: ",book_to_be_loan);
  const bookFinder = await Book.findOne(book_to_be_loan);

  if (!bookFinder || (bookFinder && bookFinder.status === "notAvailable")) {
    throw new ApiError(400, "Book not Found or Not Available!!!");
  }

  console.log("bookFinder: ", bookFinder.id);

  console.log("student_details.id:", student_details.id);
  const createLeanderTable = await LeanderBook.create({
    book: bookFinder.id,
    student: student_details.id,
  });

  await Book.findByIdAndUpdate(bookFinder.id, {
    $set: { status: "notAvailable" },
  });

  await Student.findByIdAndUpdate(
    id,
    { $push: { books: { book: bookFinder.id } } },
    { new: true, runValidators: true }
  );
  return res
    .status(200)
    .json(
      new ApiResponse(200, createLeanderTable, "updated successfully !!!!")
    );
});

const ReturnBook = asyncHandler(async (req, res) => {

  const studentId = req.params.id;
  const student_details = await Student.findById(studentId);
  if(!student_details){
    throw new ApiError(400, "Student Not found !!!!!!")
  }
  // console.log("student_details: ",student_details);
  const ReturnedBook = req.body;
  // console.log("ReturnedBook: ",ReturnedBook);

  const ReturnedBookdetails = await Book.findOne(ReturnedBook)
  if(!ReturnedBookdetails){
    throw new ApiError(400, "Book not found");
  }
  console.log("ReturnedBookdetails: ",ReturnedBookdetails);

  const ReturnedBookId = ReturnedBookdetails.id;
  console.log("ReturnedBookId: ",ReturnedBookId);

  const ReturnBook_search = student_details.books;
  console.log("ReturnBook_search: ",ReturnBook_search);

const ReturnedBookFound =   ReturnBook_search.findIndex(e=> e.book.toString() === ReturnedBookId.toString());
console.log("ReturnedBookFound :",ReturnedBookFound );

if(ReturnedBookFound == -1){
  throw new ApiError(400, "Book not in the loan field")
}
student_details.books.splice(ReturnedBookFound, 1);
await student_details.save(); // Save the updated student document
await Book.findByIdAndUpdate(ReturnedBookId, { $set: { status: "available" } });


return res.json(new ApiResponse(200, student_details.books,"Returned Book Found "))
});

export {
  bookCreate,
  bookData,
  bookEdit,
  bookDelete,
  bookFilter,
  totalBooks,
  IssueBook,
  ReturnBook,
};
