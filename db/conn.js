import mongoose from "mongoose";
import { DB_NAME } from "../src/constant.js";
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log("Database connected successfully");
  } catch (error) {
    console.log("MongoDB Connection Error hai:", error);
  }
};
export default connectDB;
