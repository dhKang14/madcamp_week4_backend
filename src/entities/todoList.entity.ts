import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { UserProfile } from "./userProfile.entity";

@Entity("todo_list")
export class TodoList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  task: string;

  @Column()
  date: string;

  @Column()
  place: string;

  @Column()
  animation: string;

  @Column()
  order_in_date: number;

  @Column({ default: "NOT_STARTED" })
  completed_in_progress: string;

  @ManyToOne(() => UserProfile, (user) => user.todolists, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: UserProfile;
}
