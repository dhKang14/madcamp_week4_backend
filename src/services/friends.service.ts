import { myDataSource } from "../datasource";
import { TodoRepository, UserRepository } from "../repositories";

class FriendsService {
  static async addFriend(userId: number, friendId: number) {
    try {
      // 친구 추가 로직을 구현
      const user = await UserRepository.findOne({
        where: {
          id: userId,
        },
        relations: ["friends"],
      });
      const friend = await UserRepository.findOne({
        where: {
          id: friendId,
        },
      });
      const existingFriendship = user?.friends.some(
        (friend) => friend.id === friendId
      );

      if (existingFriendship) {
        return { message: "이미 친구입니다." };
      }

      if (!user || !friend) {
        return { message: "없는 사람입니다" };
      }

      const newFriendship = await UserRepository.update(
        { id: userId },
        {
          friends: [...user?.friends, friend],
        }
      );

      return { message: "친구가 추가되었습니다." };
    } catch (error) {
      throw new Error("친구 추가 중에 오류가 발생했습니다.");
    }
  }

  static async getFriends(userId: number) {
    try {
      // 사용자의 친구 목록을 불러오는 로직을 구현
      const user = await UserRepository.findOne({
        where: {
          id: userId,
        },
        relations: ["friends"],
      });

      return user?.friends;
    } catch (error) {
      throw new Error("친구 목록을 가져오는 중에 오류가 발생했습니다.");
    }
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
