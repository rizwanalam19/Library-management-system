import express from "express";
const app = express();
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
dotenv.config({
  path: "/env",
});
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cors({
  origin: true,
  credentials: true
}))
app.use(
  session({
    secret: process.env.SECRET_KEY,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hours
    },
    resave: true,
    saveUninitialized: false,
  })
);

import book from "../router/book.route.js";
import author from "../router/author.route.js";
import login from "../router/user.route.js";
import student from "../router/student.route.js"
import { isAuthenticated } from "../middleware/isAuthenticate.middleware.js";
app.use("/api/v1/book", book);
app.use("/api/v1/author", isAuthenticated, author);
app.use("/api/v1/user", login);
app.use("/api/v1/student", student)

// app.get("/dashboard", isAuthenticated, (req, res) => {
//   console.log(req.session);
//   res.send("Welcome to your dashboard");
// });

export { app };
