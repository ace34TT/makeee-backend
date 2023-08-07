import { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
const imagePath = path.join(__dirname, "../images");

export const GetProvinceHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const provinceName = req.params.province_name;
  console.log(provinceName);
  const dataFilePath = path.join(__dirname, "../data/provinces.json");
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the JSON file:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    try {
      // Parse the JSON data
      const provinces = JSON.parse(data).provinces;

      // Find the province based on the given name
      const foundProvince = provinces.find(
        (province) => province.name === provinceName
      );
      console.log(foundProvince);
      if (!foundProvince) {
        return res.status(404).json({ error: "Province not found" });
      }

      // If the province is found, send it in the response
      return res.status(200).json(foundProvince);
    } catch (error) {
      console.error("Error parsing JSON data:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
};

export const GetImage = async (
  req: Request,
  res: Response,
) => {
  const imageName = req.params.image_name;
  const imagePathFull = path.join(imagePath, imageName);
  res.sendFile(imagePathFull);
};
