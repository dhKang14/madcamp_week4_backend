import { NextFunction, Request, Response } from "express";
import { myDataSource } from "./datasource";
////////
import http from "http";
import socketIo from "socket.io"; // Socket.IO 추가
////////

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var usersRouter = require("./routes/users.route");
var authRouter = require("./routes/auth.route");
var todoRouter = require("./routes/todo.route");
var friendsRouter = require("./routes/friends.route");

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
app.use("/friends", friendsRouter);

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

/////////////////
const server = http.createServer(app);
const io = new socketIo.Server(server);

// Socket.IO 이벤트 처리
io.on("connection", (socket) => {
  console.log("사용자가 연결되었습니다.");

  // 클라이언트에서 '친구 위치 업데이트' 이벤트를 받음
  socket.on("친구 위치 업데이트", (data) => {
    // data에는 친구의 위치 및 정보가 포함됩니다.
    // 이 위치 및 정보를 다른 클라이언트에게 브로드캐스트하여 실시간 업데이트를 수행합니다.
    socket.broadcast.emit("친구 위치 업데이트", data);
  });

  // 연결 종료 시
  socket.on("disconnect", () => {
    console.log("사용자가 연결 해제되었습니다.");
  });
});
///////////////////////

// init data
myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => console.log("Error:", err));

module.exports = app;

export { io };
