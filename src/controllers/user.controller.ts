import { Request, Response, NextFunction } from "express";

export const UserSignUpHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.send({ message: "user register successfully" });
};
export const UserSignInHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
