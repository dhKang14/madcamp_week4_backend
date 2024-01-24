import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from "typeorm";
import { UserProfile } from "./userProfile.entity";

@Entity("friendship")
export class FriendShip {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserProfile, (user) => user.friendships)
  @JoinColumn({ name: "user_id" })
  user1: UserProfile;

  @ManyToOne(() => UserProfile, (user) => user.friendships)
  @JoinColumn({ name: "friend_id" })
  user2: UserProfile;
}
