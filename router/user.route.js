import { createUser, loginUser } from "../controller/user.controller.js";
import { Router } from "express";
const router = Router();

router.route("/signup").post(createUser)
router.route("/login").post(loginUser)
export default router;