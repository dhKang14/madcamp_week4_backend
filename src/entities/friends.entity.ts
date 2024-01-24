// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   JoinColumn,
// } from "typeorm";
// import { UserProfile } from "./userProfile.entity";

// @Entity("friends")
// export class Friends {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => UserProfile, (user) => user.friend)
//   @JoinColumn({ name: "user_id" })
//   user: UserProfile;

//   @ManyToOne(() => UserProfile)
//   @JoinColumn({ name: "friend_id" })
//   friend: UserProfile;

//   @Column({ default: false })
//   areFriends: boolean;
// }

// // @Entity("friendlocation")
// // export class FriendLocation {
// //   @PrimaryGeneratedColumn()
// //   id: number;

// //   @ManyToOne(() => UserProfile, (user) => user.friendLocations)
// //   @JoinColumn({ name: 'user_id' })
// //   user: UserProfile;

// //   @ManyToOne(() => UserProfile)
// //   @JoinColumn({ name: 'friend_id' })
// //   friend: UserProfile;

// //   @Column({ default: false })
// //   isWalking: boolean;

// //   @Column({ type: 'json', nullable: true })
// //   direction: { x: number; y: number; z: number };

// //   @Column({ type: 'json', nullable: true })
// //   position: { x: number; y: number; location: string };

// // }
