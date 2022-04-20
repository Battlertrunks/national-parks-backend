import { ObjectId } from "bson";
import CommentModel from "./CommentModel";

export default interface PostModel {
  uid: string;
  title: string;
  body: string;
  username: string;
  dateAndTime: string;
  imageURL?: string;
  _id?: ObjectId;
  likes: Likes;
  comments: CommentModel[];
}

interface Likes {
  amountOfLikes: number;
  uids: string[];
}
