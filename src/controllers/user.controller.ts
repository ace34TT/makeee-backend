import { Request, Response, NextFunction } from "express";

export const UserSignUpHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  console.log("singing up user");
  return res.send({ message: "user register successfully" });
};
export const UserSignInHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
