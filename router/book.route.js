import { Router } from "express";
const router = Router();
import {
  bookCreate,
  bookData,
  bookEdit,
  bookDelete,
  bookFilter,
  totalBooks,
  IssueBook,
  ReturnBook
} from "../controller/book.controller.js";
router
  .route("/book-details/:id")
  .post(bookCreate)
  .patch(bookEdit)
  .delete(bookDelete);
  router.route("/book-issue/:id").post(IssueBook);
router.route("/book-details").get(bookData);
router.route("/book-detail").get(bookFilter);
router.route("/total-books").get(totalBooks);
router.route("/return-book/:id").post(ReturnBook);
export default router;
