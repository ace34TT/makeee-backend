import express from "express";
import {
  UserSignInHandler,
  UserSignUpHandler,
} from "../controllers/user.controller";
const router = express.Router();

router.post("/sign-up", UserSignUpHandler);
router.post("/sign-in", UserSignInHandler);

export { router as UserRoute };
