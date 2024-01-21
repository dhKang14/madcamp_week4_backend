import { type NextFunction, type Request, type Response } from "express";
import fs from "fs";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { UserRepository } from "../repositories";
import { createJWT } from "../services/auth.service";

const path = require("path");
const publicKeyPath: string = path.join(__dirname, "../certs/public.key");
const publicKey = fs.readFileSync(publicKeyPath);

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.accessToken;

    const decoded = jwt.verify(token, publicKey, {
      algorithms: ["RS256"],
    }) as JwtPayload;

    const tokenId = Number(decoded.id as string);

    (req as any).user = tokenId;
    const user = await UserRepository.findOne({
      where: { id: tokenId },
    });
    if (user === null) {
      res
        .status(404)
        .cookie("accessToken", null, {
          httpOnly: true,
          secure: true,
        })
        .json({ success: false, message: "Unauthorized: no such user." });
    } else {
      res.cookie("accessToken", createJWT(user), {
        httpOnly: true,
        secure: true,
      });
      next();
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return res
      .cookie("accessToken", null, {
        httpOnly: true,
        secure: true,
      })
      .status(500)
      .send("Internal Server Error");
  }
};
