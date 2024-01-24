import { NextFunction, Request, Response } from "express";
import userService from "../services/users.service";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req as any).user; // middleware에서 유저 ID를 가져오기.
  const response = await userService.getUser(Number(userId));
  res.json(response);
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user; // middleware에서 유저 ID를 가져오기.
    const updatedData = req.body; // 업데이트할 데이터를 요청 본문에서 받아옵니다.
    const response = await userService.updateUser(Number(userId), updatedData);
    res.json(response);
  } catch (error: any) {
    if (error.message == "no user") {
      res.status(404).json({ error: "존제하지 않는 사용자입니다." });
    } else if (error.message == "email exists") {
      res.status(409).json({ error: "존제하는 사용자입니다." });
    } else {
      res
        .status(500)
        .json({ error: "유저 정보 변경 중에 오류가 발생했습니다." });
    }
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req as any).user; // middleware에서 유저 ID를 가져오기.
  const response = await userService.deleteUser(Number(userId));
  res.json(response);
};

export const carrotRank = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const topCarrotUsers = await userService.carrotRank(20);
    res.json(topCarrotUsers);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "유저 목록을 가져오는 중에 오류가 발생했습니다." });
  }
};
