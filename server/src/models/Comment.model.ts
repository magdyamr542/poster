import { model, Schema } from "mongoose";
import { CommentInterface } from "../dataShapes/interfaces";

const comment = new Schema({
  userId: { type: String, required: true },
  content: { type: String, required: true },
  username: { type: String, required: false },
  createdAt: { type: Date, required: false, default: Date.now },
});

export const Comment = model<CommentInterface>("comment", comment);
