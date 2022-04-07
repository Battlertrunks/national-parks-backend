import { ObjectId } from "bson";
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

NationalParksRoute.get("/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const client = await getClient();
    const result = await client
      .db()
      .collection<CompletedParks>("attendedParks")
      .findOne({ _id: new ObjectId(id) });
    res.json(result).status(200);
  } catch (err) {
    errorResponse(err, res);
  }
});

NationalParksRoute.post("/", async (req, res) => {
  try {
    const addedPark: CompletedParks = req.body;
    const client = await getClient();
    await client
      .db()
      .collection<CompletedParks>("attendedParks")
      .insertOne(addedPark);

    res.json(addedPark).status(201);
  } catch (err) {
    errorResponse(err, res);
  }
});

NationalParksRoute.put("/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const updatedParkProgress: CompletedParks = req.body;
    const client = await getClient();
    const results = await client
      .db()
      .collection<CompletedParks>("attendedParks")
      .updateOne({ _id: new ObjectId(id) }, updatedParkProgress);
    if (results.modifiedCount) {
      res.json(updatedParkProgress).status(200);
    } else {
      res.status(404).send(`ID of ${id} can not be found.`);
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

NationalParksRoute.delete("/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const client = await getClient();
    const result = await client
      .db()
      .collection<CompletedParks>("attendedParks")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount) {
      res.sendStatus(204);
    } else {
      res.status(404).send(`ID of ${id} can not be found.`);
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

export default NationalParksRoute;
