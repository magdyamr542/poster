import { SignOptions } from "jsonwebtoken";
import { getTokenHours } from "./utils/utils";

export const jwtOptions: SignOptions = {
  algorithm: "RS256",
  expiresIn: getTokenHours(24),
};
