import { Server_Routes } from "../interfaces/enums";
import { AxiosRequest } from "../interfaces/types";
import { getCookie } from "./cookieService";

export class AxiosRequestService {
  static loginRequest = (
    name: string,
    email: string,
    password: string
  ): AxiosRequest => {
    const request: AxiosRequest = {
      method: "post",
      data: { name, email, password },
      url: Server_Routes.LOG_IN,
    };
    return request;
  };

  static signupRequest = (
    name: string,
    email: string,
    password: string
  ): AxiosRequest => {
    const request: AxiosRequest = {
      method: "post",
      data: { name, email, password },
      url: Server_Routes.SIGN_UP,
    };
    return request;
  };

  static getAllPostsRequest = (): AxiosRequest => {
    const request: AxiosRequest = {
      method: "get",
      url: Server_Routes.GET_ALL_POSTS,
      headers: {
        auth: getCookie("token"),
      },
    };
    return request;
  };
}
