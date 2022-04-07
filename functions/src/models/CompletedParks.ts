import { ObjectId } from "mongodb";

export default interface ShoutOut {
  _id?: ObjectId;
  id: string;
  fullName: string;
  activities: string[];
  description: string;
}
