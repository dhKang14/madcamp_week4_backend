import { myDataSource } from "../datasource";
import { TodoList } from "../entities/todoList.entity";
import { UserProfile } from "../entities/userProfile.entity";

export const UserRepository = myDataSource.getRepository(UserProfile);
export const TodoRepository = myDataSource.getRepository(TodoList);
