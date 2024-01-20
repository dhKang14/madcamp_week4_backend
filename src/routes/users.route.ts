import {
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/users.controller";

var express = require("express");
var router = express.Router();
//회원 정보 조회
router.get("/:userId", getUser);

// 회원 정보 수정
router.patch("/:userId", updateUser);

// 회원 정보 삭제
router.delete("/:userId", deleteUser);

module.exports = router;
