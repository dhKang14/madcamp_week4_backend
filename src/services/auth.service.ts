import { error } from "console";
import { myDataSource } from "../datasource";
import { UserProfile } from "../entities/userProfile.entity";
import { TodoRepository, UserRepository } from "../repositories";

import * as jwt from "jsonwebtoken";
import * as fs from "fs";
import * as path from "path";

const privateKeyPath: string = path.join(__dirname, "../certs/private.key");
const privateKey = fs.readFileSync(privateKeyPath);

async function login(email: string, password: string) {
  // 로그인 로직을 구현하세요.
  // 이메일과 비밀번호를 사용하여 사용자를 찾습니다.
  const userEmail = await UserRepository.findOne({
    where: { email: email },
  });
  if (!userEmail) {
    // 사용자를 찾을 수 없으면 로그인 실패로 처리합니다.
    throw new Error("no user");
  }

  const user: UserProfile | null = await UserRepository.findOne({
    where: { email: email, password: password },
  });

  if (user === null) {
    // 사용자를 찾을 수 없으면 로그인 실패로 처리합니다.
    throw new Error("로그인 실패: 이메일 또는 비밀번호가 일치하지 않습니다.");
  }
  // 로그인 성공 시 사용자 프로필 정보를 반환합니다.
  return user;
}

async function logout() {
  // 로그아웃 로직을 구현하세요.
}

async function signup(password: string, name: string, email: string) {
  // 회원 가입 로직을 구현하세요.
  // 사용자 생성
  const user = await UserRepository.findOne({
    where: { email: email },
  });
  if (user !== null) {
    throw new Error("existing user");
  }

  const newuser = UserRepository.create({
    password: password,
    name: name,
    email: email,
  });
  await UserRepository.save(newuser);
  // 사용자 프로필 정보 반환
  return newuser;
}

async function changePassword(
  email: string,
  password: string,
  newpassword: string
) {
  // 비밀번호 변경 로직을 구현하세요.
  try {
    const user = await UserRepository.findOne({
      where: { email: email, password: password },
    });

    if (!user) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }

    // 비밀번호 업데이트
    user.password = newpassword;
    await UserRepository.save(user);

    return true; // 비밀번호 변경 성공
  } catch (error) {
    throw new Error("비밀번호 변경 중에 오류가 발생했습니다.");
  }
}

const AuthService = {
  login,
  logout,
  changePassword,
  signup,
};

export default AuthService;

export const createJWT = (user: UserProfile) => {
  const token = jwt.sign(
    { id: user.id, email: user.email, iat: Math.floor(Date.now() / 1000) },
    privateKey,
    {
      algorithm: "RS256",
      expiresIn: "3d",
    }
  );
  return token;
};
