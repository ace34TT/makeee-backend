import express from "express";
import { GetFile } from "../controllers/file.controller";

const router = express.Router();

router.get("image", GetFile);

export { router as FileRoute };
