import { model, Schema, Types } from "mongoose";
import { Roles } from "../dataShapes/enums";
import { UserInterface } from "../dataShapes/interfaces";
const user = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: Roles, default: Roles.NORMAL, required: false },
});

export const User = model<UserInterface>("User", user);
