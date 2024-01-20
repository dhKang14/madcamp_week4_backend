import { NextFunction, Request, Response } from "express";
import userService from "../services/users.service";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;
  const response = await userService.getUser(Number(userId));
  res.json(response);
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;
  const updatedData = req.body; // 업데이트할 데이터를 요청 본문에서 받아옵니다.
  const response = await userService.updateUser(Number(userId), updatedData);
  res.json(response);
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;
  const response = await userService.deleteUser(Number(userId));
  res.json(response);
};
