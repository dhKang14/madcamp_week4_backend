import express from "express";
import ToDoController from "../controllers/todo.controller";

const router = express.Router();

// 특정 날짜의 To-Do 목록을 가져오는 API 엔드포인트
router.get("/todos/:date", ToDoController.getToDo);

// 새로운 To-Do 목록을 생성하는 API 엔드포인트
router.post("/todos", ToDoController.createToDo);

// To-Do 목록을 업데이트하는 API 엔드포인트
router.patch("/todos/:id", ToDoController.updateToDo);

// To-Do 목록을 삭제하는 API 엔드포인트
router.delete("/todos/:id", ToDoController.deleteToDo);

export default router;
