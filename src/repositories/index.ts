import { myDataSource } from "../datasource";
import { FriendShip } from "../entities/friends.entity";
import { TodoList } from "../entities/todoList.entity";
import { UserProfile } from "../entities/userProfile.entity";

export const UserRepository = myDataSource.getRepository(UserProfile);
export const TodoRepository = myDataSource.getRepository(TodoList);
export const FriendRepository = myDataSource.getRepository(FriendShip);
