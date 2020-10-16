import * as jsCookie from "js-cookie";
import { ParsedJwtToken } from "../interfaces/types";
const domino = require("domain");
export const setCookieToClient = (name: string, value: string) => {
  jsCookie.set(name, value);
};

export const getCookie = (name: string) => {
  return jsCookie.get(name);
};

const jwtDecode = (t: string) => {
  let token: ParsedJwtToken = {} as ParsedJwtToken;
  token.token = t;
  let payload = JSON.parse(window.atob(t.split(".")[1]));
  token.exp = payload.exp;
  token.iat = payload.iat;
  token.username = payload.username;
  token.id = payload.id;
  return token;
};

export const parseJwtToken = (token: string): ParsedJwtToken => {
  return jwtDecode(token);
};
