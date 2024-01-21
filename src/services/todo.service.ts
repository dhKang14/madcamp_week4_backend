import { getRepository } from "typeorm";
import { myDataSource } from "../datasource";
import { TodoList } from "../entities/todoList.entity";
import { TodoRepository, UserRepository } from "../repositories";

class ToDoService {
  static async getToDo(userId: any, date: any) {
    try {
      // 데이터베이스에서 특정 사용자와 날짜의 To-Do 목록을 조회합니다.
      const user = await UserRepository.findOne({ where: { id: userId } });
      if (user == null) {
        return;
      }
      const toDos = await TodoRepository.find({
        where: {
          user: user,
          date: date,
        },
      });
      return toDos;
    } catch (error) {
      throw new Error("To-Do 목록을 가져오는 중에 오류가 발생했습니다.");
    }
  }

  static async createToDo(
    userId: any,
    date: Date,
    task: any,
    place: any,
    animation: any,
    order_in_date: number,
    completed_in_progress: string
  ) {
    try {
      // 데이터베이스에 새로운 To-Do를 생성하고 반환합니다.
      const user = await UserRepository.findOne({ where: { id: userId } });
      if (user == null) {
        return;
      }

      const newToDo = TodoRepository.create({
        user: user,
        task: task,
        date: date,
        place: place,
        animation: animation,
        order_in_date: order_in_date,
        completed_in_progress: completed_in_progress,
      });
      await TodoRepository.save(newToDo);
      return newToDo;
    } catch (error) {
      throw new Error("To-Do를 생성하는 중에 오류가 발생했습니다.");
    }
  }

  static async updateToDo(id: number, changedToDo: Partial<TodoList>) {
    // To-Do를 업데이트하고 데이터베이스에 저장합니다.
    const existingToDo = await TodoRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!existingToDo) {
      return null; // 해당 To-Do를 찾을 수 없을 경우 null 반환
    }

    await TodoRepository.update({ id: id }, changedToDo);
    return existingToDo;
  }

  static async deleteToDo(id: number) {
    try {
      // To-Do를 삭제하고 데이터베이스에서 제거합니다.
      const deletedToDo = await TodoRepository.findOne({
        where: {
          id: id,
        },
      });

      if (!deletedToDo) {
        return null; // 해당 To-Do를 찾을 수 없을 경우 null 반환
      }

      await TodoRepository.delete({ id: id });
      return deletedToDo;
    } catch (error) {
      throw new Error("To-Do를 삭제하는 중에 오류가 발생했습니다.");
    }
  }

  static async getToDoOrderByDate(userId: number, date: Date) {
    // userId와 date에 맞는 To-Do 목록을 order_in_date 순으로 정렬하여 가져옵니다.
    const toDos = await TodoRepository.createQueryBuilder("todo")
      .where("todo.userId = :userId", { userId })
      .andWhere("todo.date = :date", { date })
      .orderBy("todo.order_in_date", "ASC") // order_in_date를 기준으로 오름차순 정렬
      .getMany();

    return toDos;
  }
}

export default ToDoService;

export const convertStringDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-").map(Number);
  const convertedDate = new Date(year, month - 1, day);
  return convertedDate;
};
