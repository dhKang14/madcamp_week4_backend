import { myDataSource } from "../datasource";
import { UserProfile } from "../entities/userProfile.entity";
import { UserRepository } from "../repositories";

export const getUser = async (userId: number) => {
  const userRepository = myDataSource.getRepository(UserProfile);
  const user = await userRepository.findOne({ where: { id: userId } });
  return user;
};

export const updateUser = async (
  userId: number,
  updatedData: Partial<UserProfile>
) => {
  const user = await UserRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new Error("no user");
  }

  const sameEmail = await UserRepository.findOne({
    where: { email: updatedData.email },
  });
  if (sameEmail && sameEmail.id !== userId) {
    throw new Error("email exists");
  }
  // 업데이트할 필드를 적용합니다.
  const updatedUser: Partial<UserProfile> = {
    name: updatedData.name,
    email: updatedData.email,
  };

  await UserRepository.update({ id: userId }, updatedUser);
  return user;
};

export const deleteUser = async (userId: number) => {
  const user = await UserRepository.findOne({ where: { id: userId } });

  if (!user) {
    return { error: "해당 사용자를 찾을 수 없습니다." };
  }

  await UserRepository.remove(user);

  return { message: "사용자가 삭제되었습니다." };
};

export const carrotRank = async (limit: number) => {
  try {
    // 당근 수에 따라 상위 20명의 사용자를 가져옵니다.
    const topCarrotUsers = await UserRepository.createQueryBuilder(
      "user_profile"
    )
      .orderBy("user_profile.carrots", "DESC")
      .limit(limit)
      .getMany();
    return topCarrotUsers;
  } catch (error) {
    throw error;
  }
};

const userService = {
  getUser,
  updateUser,
  deleteUser,
  carrotRank,
};

export default userService;
