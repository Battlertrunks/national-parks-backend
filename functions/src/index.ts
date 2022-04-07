import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import NationalParksRoute from "./routes/NationalParksRoute";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/attendedParks", NationalParksRoute);
export const api = functions.https.onRequest(app);
