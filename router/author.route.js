import {
  authorCreate,
  authorData,
  authorEdit,
  authorDelete,
} from "../controller/author.controller.js";
import { Router } from "express";
const router = Router();

router.route("/author-details").post(authorCreate).get(authorData);
router.route("/author-details/:id").patch(authorEdit).delete(authorDelete);

export default router;
