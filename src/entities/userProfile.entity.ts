import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { TodoList } from "./todoList.entity";

@Entity("user_profile")
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: 0 })
  carrots: number;

  @OneToMany(() => TodoList, (todolist) => todolist.user, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "todolist" })
  todolists: TodoList[];
}
