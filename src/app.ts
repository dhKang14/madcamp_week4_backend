import { NextFunction, Request, Response } from "express";
import { myDataSource } from "./datasource";

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var usersRouter = require("./routes/users.route");
var authRouter = require("./routes/auth.route");
var todoRouter = require("./routes/todo.route");

var app = express();
var cors = require("cors");

// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3001");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

// app.use(cors());

const allowedOrigins = [
  "http://localhost:3001",
  "https://deploy-preview-5--sweet-torte-ca49b9.netlify.app",
  "https://main--sweet-torte-ca49b9.netlify.app",
  "https://sweet-torte-ca49b9.netlify.app",
]; // Add your additional origin(s) here
app.use(cors({ origin: allowedOrigins, credentials: true }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//현아!!!!
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/todos", todoRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// init data
myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => console.log("Error:", err));

module.exports = app;
