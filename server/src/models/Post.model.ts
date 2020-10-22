import { model, Schema, Types } from "mongoose";
import { PostInterface } from "../dataShapes/interfaces";

const post = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: false, default: "No Title" },
  content: { type: String, required: true },
  username: { type: String, required: false },
  createdAt: { type: Date, required: false, default: Date.now },
  upVote: { type: Number, required: false, default: 0 },
  downVote: { type: Number, required: false, default: 0 },
});

export const Post = model<PostInterface>("post", post);
