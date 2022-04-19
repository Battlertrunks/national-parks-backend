import { ObjectId } from "mongodb";

export default interface TrendingCardsModel {
  uid?: string;
  username: string;
  id: string;
  _id?: ObjectId;
  fullName: string;
  description: string;
  parkCode: string;
  activities: Activities[];
}

interface Activities {
  name: string;
  id: string;
  completed: boolean;
}
