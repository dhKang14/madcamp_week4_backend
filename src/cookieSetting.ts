import { CookieOptions } from "express";

export const cookieSettings: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

export const nullCookieSettings: CookieOptions = {
  ...cookieSettings,
  expires: new Date(0),
};
