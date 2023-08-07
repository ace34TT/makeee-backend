import { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import exp from "constants";

export const GetProvinceHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const provinceName = req.params.province_name;
  console.log(provinceName);
  const dataFilePath = path.join(__dirname, "../../src/data/provinces.json");
  console.log(dataFilePath);

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
        (province: any) => province.name === provinceName
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

export const GetImage = async (req: Request, res: Response) => {
  const imagePath = path.join(__dirname, "../../src/images");
  const imageName = req.params.image_name;
  const imagePathFull = path.join(imagePath, imageName);
  res.sendFile(imagePathFull);
};

export const GetSearch = async (req: Request, res: Response) => {
  const text = req.params.text_search;
  console.log("finding");
  const result = searchHotels(text);
  return res.status(200).json(result);
};

function searchHotels(input: any) {
  const data = require("../../src/data/recherche.json");
  const searchTerm = input.toLowerCase();
  const results = data.hotel.filter(
    (hotel: any) =>
      hotel.name.toLowerCase().includes(searchTerm) ||
      hotel.province.toLowerCase().includes(searchTerm)
  );
  return results;
}
