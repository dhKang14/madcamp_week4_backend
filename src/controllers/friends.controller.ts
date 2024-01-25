import { Request, Response } from "express";
import friendsService from "../services/friends.service";
// import { io } from ".../app.ts";

class FriendsController {
  static async addFriend(req: Request, res: Response) {
    try {
      const userId = (req as any).user;
      const { friendEmail } = req.body;
      const result = await friendsService.addFriend(userId, friendEmail);
      res.status(200).json(result);
    } catch (error: any) {
      console.error(error);
      if (error.message === "no such user") {
        res.status(404);
      } else if (error.message === "already friends") {
        res.status(409);
      } else {
        res.status(500);
      }
      res.json({ error: error.message });
    }
  }

  static async deleteFriend(req: Request, res: Response) {
    try {
      const userId = (req as any).user;
      const friendId = Number(req.params.id);
      const result = await friendsService.deleteFriend(userId, friendId);
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

  static async getFriendMap(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const friendMap = await friendsService.getFriendMap(Number(id));
      res.status(200).json(friendMap);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default FriendsController;
