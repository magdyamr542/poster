import { InfoMsgProps } from "../component/InfoMsg";

export type TextInputType = "email" | "password" | "text" | "number";
export interface InfoMsgInterface extends InfoMsgProps {}
export type AxiosMethod = "get" | "post" | "delete";
export interface AxiosRequest {
  method: AxiosMethod;
  url: string;
  data?: object;
  headers?: object;
}

export interface AuthResponse {
  msg?: string;
  data: object;
  err?: string;
  token?: string;
}

export interface ParsedJwtToken {
  token: string;
  exp: number;
  iat: number;
  id: string;
  username: string;
}

export interface CurrentUser {
  username: string;
  id: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  userId: string;
}
