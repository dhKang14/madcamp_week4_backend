import {
  deleteUser,
  getUser,
  updateUser,
  carrotRank,
} from "../controllers/users.controller";
import { auth } from "../middleware/auth";

var express = require("express");
var router = express.Router();
//회원 정보 조회
router.get("/", auth, getUser);

// 회원 정보 수정
router.patch("/", auth, updateUser);

// 회원 정보 삭제
router.delete("/", auth, deleteUser);

// 당근 랭킹
router.get("/carrot", auth, carrotRank);

module.exports = router;
