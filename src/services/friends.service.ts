import { myDataSource } from "../datasource";
import {
  FriendRepository,
  TodoRepository,
  UserRepository,
} from "../repositories";

class FriendsService {
  static async addFriend(userId: number, friendEmail: string) {
    // 친구 추가 로직을 구현
    const user = await UserRepository.findOne({
      where: {
        id: userId,
      },
      relations: ["friendships", "friendships.user2"],
    });

    const existingFriendship = user?.friendships.some(
      (friendship) => friendship.user2.email === friendEmail
    );

    if (user?.email === friendEmail) {
      return user.friendships;
    }
    if (existingFriendship) {
      console.log("이미 친구입니다.");
      throw new Error("already friends");
    }

    const friend = await UserRepository.findOne({
      where: {
        email: friendEmail,
      },
      relations: ["friendships"],
    });

    if (!user || !friend) {
      throw new Error("no such user");
    }

    // user.friends.push(friend);
    // friend.friends.push(user);
    // // const updatedUserFriends = await UserRepository.save([user, friend]);
    // await UserRepository.save(user);
    // await UserRepository.save(friend);

    const newFriendShip = FriendRepository.create({
      user1: user,
      user2: friend,
    });
    await FriendRepository.save(newFriendShip);
    const newFriendShip2 = FriendRepository.create({
      user1: friend,
      user2: user,
    });
    await FriendRepository.save(newFriendShip2);
    // 사용자 프로필 정보 반환

    return [...user.friendships, newFriendShip];
  }

  static async deleteFriend(userId: number, friendId: number) {
    const friendShip = await FriendRepository.findOne({
      where: { user1: { id: userId }, user2: { id: friendId } },
    });
    const friendShip2 = await FriendRepository.findOne({
      where: { user1: { id: friendId }, user2: { id: userId } },
    });

    if (!friendShip || !friendShip2) {
      throw new Error("no such friendship");
    }

    await FriendRepository.remove(friendShip);
    await FriendRepository.remove(friendShip2);

    return await this.getFriends(userId);
  }

  static async getFriends(userId: number) {
    // 사용자의 친구 목록을 불러오는 로직을 구현
    const user = await UserRepository.findOne({
      where: {
        id: userId,
      },
      relations: ["friendships", "friendships.user2"],
    });

    return user?.friendships;
  }

  // static async getFriendLocation(friendId: number) {
  //   try {
  //     // 친구의 위치 정보를 가져오는 로직을 구현
  //     const friendLocation = await FriendLocation.findOne({
  //       where: {
  //         friend: friendId,
  //       },
  //     });

  //     return friendLocation;
  //   } catch (error) {
  //     throw new Error("친구의 위치 정보를 가져오는 중에 오류가 발생했습니다.");
  //   }
  // }
}

export default FriendsService;
