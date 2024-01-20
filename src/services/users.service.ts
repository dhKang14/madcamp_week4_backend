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
    return { error: "해당 사용자를 찾을 수 없습니다." };
  }

  // 업데이트할 필드를 적용합니다.
  if (updatedData.password) {
    user.password = updatedData.password;
  }
  if (updatedData.name) {
    user.name = updatedData.name;
  }
  if (updatedData.email) {
    user.email = updatedData.email;
  }
  if (updatedData.carrots) {
    user.carrots = updatedData.carrots;
  }

  await UserRepository.save(user);

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

const userService = {
  getUser,
  updateUser,
  deleteUser,
};

export default userService;
