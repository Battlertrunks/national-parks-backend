import { ObjectId } from "bson";

export default interface CommentModel {
  uid: string;
  dateAndTime: string;
  username: string;
  text: string;
  park_code: string;
  _id?: ObjectId;
}
