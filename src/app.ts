import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { UserRoute } from "./routes/user.routes";
// import { ImageRoute } from "./routes/image.routes";
// import {FileRoute} from "./routes/file.routes";
import { DestinationRoute } from "./routes/destination.routes";

const app = express();
//
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
// !
app.use("/api/user/", UserRoute);
app.use("/api/destination/", DestinationRoute);

export default app;
