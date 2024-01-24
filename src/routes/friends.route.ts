import express from "express";
// import friendsController from "/friends.controller";
import { auth } from "../middleware/auth";
import FriendsController from "../controllers/friends.controller";

const router = express.Router();

// 친구 추가 라우트
router.post("/add-friend", auth, FriendsController.addFriend);

// 친구 목록 불러오기 라우트
router.get("/get-friends/:userId", auth, FriendsController.getFriends);

// 친구의 맵 보기 라우트
// router.get("/view-friend-map/:friendId", FriendsController.viewFriendMap);

export default router;
