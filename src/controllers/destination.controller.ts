import { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import exp from "constants";
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

export const GetImage = async (req: Request, res: Response) => {
  const imageName = req.params.image_name;
  const imagePathFull = path.join(imagePath, imageName);
  res.sendFile(imagePathFull);
};


export const GetSearch = async (req: Request, res: Response) => {
  const text = req.params.text_search;
  const result = searchHotels(text);
  return res.status(200).json({ message: result });
  
};

function searchHotels(input) {
const data =  require('../data/recherche.json');
  const searchTerm = input.toLowerCase();
  const results = data.hotel.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchTerm) ||
      hotel.ville.toLowerCase().includes(searchTerm)
  );
  return results;
}
