import { createStudent, studentsDetails } from "../controller/student.controller.js";

import { Router } from "express";
const router = Router();

router.route("/student-details").post(createStudent);
router.route("/student-details").get(studentsDetails);

export default router