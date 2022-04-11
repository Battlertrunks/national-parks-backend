import express from "express";
import { getClient } from "../db";
import CommentModel from "../models/CommentModel";

const ParkReview = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

ParkReview.get("/", async (req, res) => {
  try {
    const { parkCode } = req.query;
    const query: any = {
      ...(parkCode ? { park_code: parkCode as string } : {}),
    };

    const client = await getClient();
    const results = await client
      .db()
      .collection<CommentModel>("parkReview")
      .find(query)
      .toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

ParkReview.post("/", async (req, res) => {
  try {
    const commentPost: CommentModel = req.body;

    const client = await getClient();
    await client
      .db()
      .collection<CommentModel>("parkReview")
      .insertOne(commentPost);

    res.json(commentPost).status(201);
  } catch (err) {
    errorResponse(err, res);
  }
});

export default ParkReview;
