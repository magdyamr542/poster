import { InfoMsgProps } from "../component/InfoMsg";

export type TextInputType = "email" | "password" | "text" | "number";
export interface InfoMsgInterface extends InfoMsgProps {}
export type AxiosMethod = "get" | "post" | "delete";
export interface AxiosRequest {
  method: AxiosMethod;
  url: string;
  data?: object;
}

export interface AuthResponse {
  msg?: string;
  data: object;
  err?: string;
}
