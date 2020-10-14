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
  userId: string;
  title?: string;
  content: string;
  _id: string;
}

export interface jwtPayload {
  username: string;
  id: string;
}
