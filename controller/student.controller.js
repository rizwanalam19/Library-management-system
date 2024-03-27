import { Student } from "../models/student.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Book } from "../models/book.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/Apiresponse.js";
const createStudent = asyncHandler(async (req, res) => {
  const { name, classes, phone } = req.body;
  const student = await Student.create({ 
    name, classes, phone
  });
 
  return res.status(200).json(new ApiResponse(200, student, "create user profile") )
});

const studentsDetails = asyncHandler(async (req, res) => {
const students = await Student.find();
  if (!students) {
    throw new ApiError(400, "Not updated");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, students, "updated successfully !!!!")
    );
});

export { createStudent, studentsDetails };


// const LocalCarRental = asyncHandler(async (req, res) => {
//   const { name, email, phone_number, query, data } = req.body;
//   console.log(req.body);
//   if (!data || !data.fromCity || !data.pickupDate || !data.pickupTime) {
//     throw new ApiError(400, "Missing required fields in data object");
//   }

//   const localRental = await Student.create({
//     name,
//     email,
//     phone_number,
//     query,
//     data: {
//       // Directly pass the data object assuming it matches the schema
//       fromCity: data.fromCity,
//       pickupDate: data.pickupDate,
//       pickupTime: data.pickupTime,
//       packageName: data.packageName, // This is optional, so it's okay if it's not included
//     },
//   });
//   res
//     .status(201)
//     .json(
//       new ApiResponse(200, localRental, "Local car rental created successfully")
//     );
// });
