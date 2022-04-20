import { ObjectId } from "bson";
import express from "express";
import { getClient } from "../db";
import CompletedParks from "../models/CompletedParks";

const nationalParksRoute = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

nationalParksRoute.get("/", async (req, res) => {
  try {
    const { uid } = req.query;
    const query: any = {
      ...(uid ? { uid: uid as string } : {}),
    };

    const client = await getClient();
    const results = await client
      .db()
      .collection<CompletedParks>("parkAccount")
      .find(query)
      .toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

nationalParksRoute.get("/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const client = await getClient();
    const result = await client
      .db()
      .collection<CompletedParks>("parkAccount")
      .findOne({ _id: new ObjectId(id) });
    res.json(result).status(200);
  } catch (err) {
    errorResponse(err, res);
  }
});

nationalParksRoute.post("/", async (req, res) => {
  try {
    const addedPark: CompletedParks = req.body;
    const client = await getClient();
    await client
      .db()
      .collection<CompletedParks>("parkAccount")
      .insertOne(addedPark);

    res.json(addedPark).status(201);
  } catch (err) {
    errorResponse(err, res);
  }
});

nationalParksRoute.put("/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const updatedParkProgress: CompletedParks = req.body;
    delete updatedParkProgress._id;
    const client = await getClient();
    const results = await client
      .db()
      .collection<CompletedParks>("parkAccount")
      .replaceOne({ _id: new ObjectId(id) }, updatedParkProgress);

    if (results.modifiedCount) {
      res.status(200);
      res.json(updatedParkProgress);
    } else {
      res.status(404).send(`ID of ${id} can not be found.`);
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

nationalParksRoute.delete("/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const client = await getClient();
    const result = await client
      .db()
      .collection<CompletedParks>("parkAccount")
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

export default nationalParksRoute;
