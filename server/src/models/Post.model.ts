import { model, Schema, Types } from "mongoose";
import { PostInterface } from "../dataShapes/interfaces";

const post = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: false, default: "No Title" },
  content: { type: String, required: true },
});

export const Post = model<PostInterface>("post", post);
