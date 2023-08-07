import express from "express";
import { GetProvinceHandler } from "../controllers/destination.controller";
import {  GetImage} from "../controllers/destination.controller";
const router = express.Router();

router.get("/province/:province_name", GetProvinceHandler);
router.get("/image/:image_name", GetImage);

export { router as DestinationRoute };
