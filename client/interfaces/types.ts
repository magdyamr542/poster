import { InfoMsgProps } from "../component/InfoMsg";

export type TextInputType = "email" | "password" | "text" | "number";
export interface InfoMsgInterface extends InfoMsgProps {}
export type AxiosMethod = "get" | "post" | "delete";
export interface AxiosRequest {
  method: AxiosMethod;
  url: string;
  data?: object;
  headers?: object;
  params?: object;
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
  username?: string;
  createdAt?: Date;
  userId: string;
  upVote?: number;
  downVote?: number;
  comments?: Comment[];
}

export interface Comment {
  _id: string;
  content: string;
  username: string;
  userId: string;
  createdAt?: Date;
}
