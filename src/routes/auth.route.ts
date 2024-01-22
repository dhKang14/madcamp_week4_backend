import express from "express";
import AuthController from "../controllers/auth.controller";
import { auth } from "../middleware/auth";

const router = express.Router();

// 로그인
router.post("/login", AuthController.login);

// 로그아웃
router.get("/logout", AuthController.logout);

// 회원 가입
router.post("/signup", AuthController.signup);

// 비밀번호 변경
router.post("/change-password", auth, AuthController.changePassword);

// 토큰 설정
// router.get("/refresh", auth);

module.exports = router;
