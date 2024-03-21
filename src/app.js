import express from "express";
const app = express();
import dotenv from "dotenv";
import session from "express-session";
dotenv.config({
  path: "/env",
});
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(
  session({
    secret: process.env.SECRET_KEY,
    cookie: {
      maxAge: 1000 * 60, // 24 hours
    },
    resave: true,
    saveUninitialized: false,
  })
);

import book from "../router/book.route.js";
import author from "../router/author.route.js";
import login from "../router/user.route.js";
import { isAuthenticated } from "../middleware/isAuthenticate.middleware.js";
app.use("/api/v1/book", isAuthenticated, book);
app.use("/api/v1/author", isAuthenticated, author);
app.use("/api/v1/user", login);

// app.get("/dashboard", isAuthenticated, (req, res) => {
//   console.log(req.session);
//   res.send("Welcome to your dashboard");
// });

export { app };
