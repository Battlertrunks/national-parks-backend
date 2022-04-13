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

parkPost.put("/comment/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const newComment = req.body;
    newComment.id = new ObjectId();
    const client = await getClient();
    const result = await client
      .db()
      .collection<PostModel>("parkPosts")
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $push: { comments: newComment },
        }
      );

    if (result.modifiedCount) {
      res.json(newComment).status(200);
    } else {
      res.status(404).send(`ID of ${id} not found.`);
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

parkPost.put("/like/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const likedPost: PostModel = req.body;
    delete likedPost._id;
    const client = await getClient();
    const result = await client
      .db()
      .collection<PostModel>("parkPosts")
      .replaceOne({ _id: new ObjectId(id) }, likedPost);

    if (result.modifiedCount) {
      res.json(likedPost).status(200);
    } else {
      res.status(404).send(`ID of ${id} not found.`);
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

parkPost.delete("/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const client = await getClient();
    const result = await client
      .db()
      .collection<PostModel>("parkPosts")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount) {
      res.sendStatus(204);
    } else {
      res.status(404).send(`ID of ${id} not found`);
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

// parkPost.put("/comment", async (req, res) => {
//   try {
//       const id: string = req.
//     const comment: CommentModel = req.body;

//     const client = await getClient();
//     await client.db().collection<PostModel>("parkPosts").replaceOne()

//   } catch (err) {
//     errorResponse(err, res);
//   }
// });

export default parkPost;
