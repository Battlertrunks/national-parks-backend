import express from "express";
import { getClient } from "../db";
import CompletedParks from "../models/completedParks";

const NationalParksRoute = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

NationalParksRoute.get("/", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<CompletedParks>("attendedParks")
      .find()
      .toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

export default NationalParksRoute;
