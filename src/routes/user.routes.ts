import express from "express";
import path from "path";
import fs from "fs";
import { UserSignInHandler } from "../controllers/user.controller";
const router = express.Router();

router.post("/sign-up", UserSignInHandler);
router.post("sign-in", UserSignInHandler);

export { router as ChatRouter };
