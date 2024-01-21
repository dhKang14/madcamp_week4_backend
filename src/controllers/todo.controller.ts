import { Request, Response } from "express";
import ToDoService, { convertStringDate } from "../services/todo.service";
import { TodoList } from "../entities/todoList.entity";

class ToDoController {
  static async getToDo(req: Request, res: Response) {
    try {
      const userId = (req as any).user; // middleware에서 유저 ID를 가져오기.
      const date = req.params.date; // URL에서 날짜 파라미터를 가져옵니다.

      // 수정된 부분: getToDoOrderByDate 메서드를 호출하여 order_in_date로 정렬된 To-Do 목록을 가져옵니다.
      const toDos = await ToDoService.getToDoOrderByDate(
        Number(userId),
        convertStringDate(date)
      );

      res.json(toDos);
    } catch (error: any) {
      console.log(error.message);
      res
        .status(500)
        .json({ error: "To-Do 목록을 가져오는 중에 오류가 발생했습니다." });
    }
  }

  static async createToDo(req: Request, res: Response) {
    try {
      const userId = (req as any).user; // middleware에서 유저 ID를 가져오기.
      const {
        task,
        place,
        date,
        animation,
        order_in_date,
        completed_in_progress,
      } = req.body; // 요청 본문에서 작업(task), 장소(place), 애니메이션(animation), order_in_date 정보를 가져옵니다.
      const newToDo = await ToDoService.createToDo(
        userId,
        date,
        task,
        place,
        animation,
        order_in_date,
        completed_in_progress
      );
      res.json(newToDo);
    } catch (error) {
      res
        .status(500)
        .json({ error: "To-Do를 생성하는 중에 오류가 발생했습니다." });
    }
  }

  static async updateToDo(req: Request, res: Response) {
    try {
      const id = req.params.id; // URL에서 To-Do ID 파라미터를 가져옵니다.
      const changedToDo: Partial<TodoList> = req.body; // 요청 본문에서 업데이트할 작업(task), 장소(place), 애니메이션(animation) 정보를 가져옵니다.
      const updatedToDo = await ToDoService.updateToDo(Number(id), changedToDo);
      if (updatedToDo) {
        res.json(updatedToDo);
      } else {
        res.status(404).json({ error: "해당 To-Do를 찾을 수 없습니다." });
      }
    } catch (error: any) {
      console.log(error.message);
      res
        .status(500)
        .json({ error: "To-Do를 업데이트하는 중에 오류가 발생했습니다." });
    }
  }

  static async deleteToDo(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const deletedToDo = await ToDoService.deleteToDo(Number(id));
      if (deletedToDo) {
        res.json({ message: "To-Do가 삭제되었습니다." });
      } else {
        res.status(404).json({ error: "해당 To-Do를 찾을 수 없습니다." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "To-Do를 삭제하는 중에 오류가 발생했습니다." });
    }
  }
}

export default ToDoController;
