import { Roles } from "./enums";
import mongoose = require("mongoose");
export interface UserInterface extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role?: Roles;
  _id: string;
}

export interface PostInterface extends mongoose.Document {
  userId: string;
  title?: string;
  content: string;
  _id: string;
  username?: string;
  createdAt?: Date;
  upVote?: number;
  downVote?: number;
  comments?: CommentInterface[];
}

export interface jwtPayload {
  username: string;
  id: string;
}

export interface CommentInterface extends mongoose.Document {
  username: string;
  userId: string;
  content: string;
  createdAt?: Date;
  _id: string;
}
