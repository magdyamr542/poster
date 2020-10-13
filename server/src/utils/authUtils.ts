import { compare, hash } from "bcryptjs";
import * as fs from "fs";
import { sign } from "jsonwebtoken";
import { jwtOptions } from "../consts";
import { jwtPayload } from "../dataShapes/interfaces";
/* generating and comparing passwords */
export const hashPassword = async (password: string, saltRounds: number) => {
  let hashed = await hash(password, saltRounds);
  return hashed;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  let same = await compare(password, hashedPassword);
  return same;
};

/* generating jwt payload */
export const generateToken = async (payload: jwtPayload) => {
  const privateKEY = fs.readFileSync("./src/utils/private.key", "utf8");
  const newPayload: jwtPayload = { username: payload.username, id: payload.id };
  let token = sign(newPayload, privateKEY, jwtOptions);
  return token;
};
