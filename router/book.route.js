import { Router } from "express";
const router = Router();
import {
  bookCreate,
  bookData,
  bookEdit,
  bookDelete,
  bookFilter,
} from "../controller/book.controller.js";
router
  .route("/book-details/:id")
  .post(bookCreate)
  .patch(bookEdit)
  .delete(bookDelete);
router.route("/book-details").get(bookData);
router.route("/book-detail").get(bookFilter);
export default router;
