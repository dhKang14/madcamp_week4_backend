import express from "express";
import AuthController from "../controllers/auth.controller";

const router = express.Router();

// 로그인
router.post("/login", AuthController.login);

// 로그아웃
router.post("/logout", AuthController.logout);

// 회원 가입
router.post("/signup", AuthController.signup);

// 비밀번호 변경
router.post("/change-password", AuthController.changePassword);

module.exports = router;
