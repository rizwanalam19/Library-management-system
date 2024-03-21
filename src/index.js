import { app } from "./app.js";

import dotenv from "dotenv";
import connectDB from "../db/conn.js";

dotenv.config({
  path: "/env",
});
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("app is running at port", process.env.PORT);
  });
  app.on("error at server ", (err) => {
    console.log("errr:", err);
    throw err;
  });
});
