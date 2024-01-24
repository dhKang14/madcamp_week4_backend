import { Request, Response } from "express";
import friendsService from "../services/friends.service";
// import { io } from ".../app.ts";

class FriendsController {
  static async addFriend(req: Request, res: Response) {
    try {
      const userId = (req as any).user;
      const { friendId } = req.body;
      const result = await friendsService.addFriend(userId, friendId);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getFriends(req: Request, res: Response) {
    try {
      const userId = (req as any).user;
      const friends = await friendsService.getFriends(userId);
      res.status(200).json(friends);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // static async viewFriendMap(req: Request, res: Response) {
  //   try {
  //     const { friendId } = req.params;
  //     // 친구의 위치 정보를 가져오는 메서드를 호출
  //     const friendLocation = await friendsService.getFriendLocation(friendId);

  //     // Socket.IO를 사용하여 해당 친구의 위치 정보를 클라이언트에게 실시간으로 보냅니다.
  //     io.emit("친구 위치 업데이트", friendLocation);

  //     res.status(200).json(friendLocation);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Internal server error" });
  //   }
  // }
}

export default FriendsController;
