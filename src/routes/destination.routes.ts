import express from "express";
import { GetProvinceHandler } from "../controllers/destination.controller";

const router = express.Router();

router.get("/province/:province_name", GetProvinceHandler);

export { router as DestinationRoute };
