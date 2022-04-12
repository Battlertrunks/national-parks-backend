import { ObjectId } from "bson";

export default interface PostModel {
  uid: string;
  title: string;
  body: string;
  username: string;
  dateAndTime: string;
  imageURL?: string;
  _id?: ObjectId;
  likes: Likes;
}

interface Likes {
  amountOfLikes: number;
  uids: string[];
}
