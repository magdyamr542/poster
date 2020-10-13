import { Roles } from "./enums";
import mongoose = require("mongoose");
export interface UserInterface extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  _id: string;
  role?: Roles;
}

export interface PostInterface extends mongoose.Document {
  authorId: string;
  title: string;
  content: string;
}

export interface jwtPayload {
  username: string;
  id: string;
}
