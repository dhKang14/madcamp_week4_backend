import { myDataSource } from "../datasource";
import { UserProfile } from "../entities/userProfile.entity";
import { TodoRepository, UserRepository } from "../repositories";

class AuthService {
  static async login(email: string, password: string) {
    // 로그인 로직을 구현하세요.
    // 이메일과 비밀번호를 사용하여 사용자를 찾습니다.
    const user = await UserRepository.findOne({
      where: { email: email, password: password },
    });

    if (!user) {
      // 사용자를 찾을 수 없으면 로그인 실패로 처리합니다.
      throw new Error("로그인 실패: 이메일 또는 비밀번호가 일치하지 않습니다.");
    }

    // 로그인 성공 시 사용자 프로필 정보를 반환합니다.
    return user;
  }

  static async logout() {
    // 로그아웃 로직을 구현하세요.
  }

  static async signup(
    password: string,
    name: string,
    email: string,
    carrots: number
  ) {
    // 회원 가입 로직을 구현하세요.
    try {
      // 사용자 생성
      const newuser = UserRepository.create({
        password: password,
        name: name,
        email: email,
        carrots: carrots,
      });
      await UserRepository.save(newuser);
      // 사용자 프로필 정보 반환
      return newuser;
    } catch (error) {
      throw new Error("회원 가입 중에 오류가 발생했습니다.");
    }
  }

  static async changePassword(
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
}

export default AuthService;
