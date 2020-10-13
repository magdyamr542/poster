import { model, Schema } from "mongoose";
import { PostInterface } from "../dataShapes/interfaces";

const post = new Schema({
  authorId: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
});

export const Post = model<PostInterface>("post", post);
