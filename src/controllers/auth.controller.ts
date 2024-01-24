import { Request, Response } from "express";
import AuthService, { createJWT } from "../services/auth.service";
import { cookieSettings, nullCookieSettings } from "../cookieSetting";

async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body; // 요청 본문에서 이메일과 비밀번호를 가져옵니다.
    const user = await AuthService.login(email, password); // AuthService의 login 메서드를 호출하여 로그인을 시도합니다.
    res.cookie("accessToken", createJWT(user), cookieSettings).json(user);
  } catch (error: any) {
    console.log(error);
    if (error.message === "no user") {
      res.status(404).json({ error: "사용자 없어요." });
    } else {
      res.status(500).json({ error: "로그인 중에 오류가 발생했습니다." });
    }
  }
}

async function logout(req: Request, res: Response) {
  try {
    // 로그아웃 로직을 구현하세요.
    // 필요한 정보를 req.body에서 가져와서 AuthService의 메서드를 호출하세요.
    res.cookie("accessToken", null, nullCookieSettings).send();
  } catch (error: any) {
    res.status(500).json({ error: "로그아웃 중에 오류가 발생했습니다." });
  }
}

async function signup(req: Request, res: Response) {
  try {
    const { password, name, email } = req.body; // 요청 본문에서 회원 가입 정보를 가져옵니다.
    const newUser = await AuthService.signup(password, name, email); // AuthService의 signup 메서드를 호출하여 회원 가입을 시도합니다.
    res.cookie("accessToken", createJWT(newUser), cookieSettings).json(newUser);
  } catch (error: any) {
    if (error.message == "existing user") {
      res.status(409).json({ error: "존제하는 사용자입니다." });
    } else {
      res.status(500).json({ error: "회원 가입 중에 오류가 발생했습니다." });
    }
  }
}

async function changePassword(req: Request, res: Response) {
  try {
    const userId = (req as any).user; // middleware에서 유저 ID를 가져오기.
    const { password, newpassword } = req.body; // 요청 본문에서 이메일, 현재 비밀번호, 새로운 비밀번호를 가져옵니다.
    const success = await AuthService.changePassword(
      userId,
      password,
      newpassword
    ); // AuthService의 changePassword 메서드를 호출하여 비밀번호 변경을 시도합니다.

    if (success) {
      res.json({ message: "비밀번호가 변경되었습니다." }); // 비밀번호 변경 성공 시 메시지를 반환합니다.
    } else {
      res.status(400).json({ error: "비밀번호 변경에 실패했습니다." });
    }
  } catch (error) {
    res.status(500).json({ error: "비밀번호 변경 중에 오류가 발생했습니다." });
  }
}

const AuthController = {
  signup,
  login,
  changePassword,
  logout,
};

export default AuthController;
