import * as jsCookie from "js-cookie";
import { ParsedJwtToken } from "../interfaces/types";

export const cookieAttributes: jsCookie.CookieAttributes = {
  sameSite: "strict",
  secure: true,
};
export const setCookieToClient = (name: string, value: string) => {
  jsCookie.set(name, value, cookieAttributes);
};

export const getCookie = (name: string) => {
  return jsCookie.get(name);
};

export const removeCookie = (name: string) => {
  return jsCookie.remove(name, cookieAttributes);
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

const parseJwtToken = (token: string): ParsedJwtToken => {
  return jwtDecode(token);
};

export const getCookieContent = (cookieName: string): ParsedJwtToken => {
  return parseJwtToken(getCookie(cookieName)!);
};
