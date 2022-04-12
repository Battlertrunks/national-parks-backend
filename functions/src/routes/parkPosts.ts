import express from "express";
import { getClient } from "../db";
import PostModel from "../models/PostModel";

const parkPost = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

parkPost.get("/", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<PostModel>("parkPosts")
      .find()
      .toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

parkPost.post("/", async (req, res) => {
  try {
    const post = req.body;
    const client = await getClient();
    client.db().collection<PostModel>("parkPosts").insertOne(post);
    res.json(post).status(201);
  } catch (err) {
    errorResponse(err, res);
  }
});

export default parkPost;
