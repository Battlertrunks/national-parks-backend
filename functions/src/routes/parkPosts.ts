import { ObjectId } from "bson";
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

parkPost.put("/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const updatedPost: PostModel = req.body;
    delete updatedPost._id;
    const client = await getClient();
    const result = await client
      .db()
      .collection<PostModel>("parkPosts")
      .replaceOne({ _id: new ObjectId(id) }, updatedPost);

    if (result.modifiedCount) {
      res.json(updatedPost).status(200);
    } else {
      res.status(404).send(`ID of ${id} not found.`);
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

export default parkPost;
