import { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
export const GetFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return "hello world";
};
