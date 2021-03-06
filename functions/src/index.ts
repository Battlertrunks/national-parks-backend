import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import nationalParksRouter from "./routes/nationalParksRouter";
import parkReviewsRouter from "./routes/parkReviewsRouter";
import parkPostsRouter from "./routes/parkPostsRouter";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/parkAccount", nationalParksRouter);
app.use("/parkReview", parkReviewsRouter);
app.use("/parkPosts", parkPostsRouter);
export const api = functions.https.onRequest(app);
