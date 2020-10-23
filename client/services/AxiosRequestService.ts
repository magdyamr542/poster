import { POST_COUNT_TO_GET_WHEN_USER_CLICKS_SHOW_MORE } from "../consts";
import { Server_Routes, VoteEnum } from "../interfaces/enums";
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

  static getLimitedPostsRequest = (skip: number): AxiosRequest => {
    const request: AxiosRequest = {
      method: "post",
      url: Server_Routes.GET_LIMITED_POSTS,
      headers: {
        auth: getCookie("token"),
      },
      data: { skip, postCount: POST_COUNT_TO_GET_WHEN_USER_CLICKS_SHOW_MORE }, // currently getting only sechs posts per click
    };
    return request;
  };

  static getAddPostRequest = (title: string, content: string): AxiosRequest => {
    const request: AxiosRequest = {
      method: "post",
      url: Server_Routes.ADD_POST,
      data: { title: title, content: content },
      headers: {
        auth: getCookie("token"),
      },
    };
    return request;
  };

  static getDeletePostRequest = (postId: string): AxiosRequest => {
    const request: AxiosRequest = {
      method: "delete",
      url: Server_Routes.DELETE_POST,
      data: { postId },
      headers: {
        auth: getCookie("token"),
      },
    };
    return request;
  };

  static getGetPostByIdRequest = (postId: string): AxiosRequest => {
    const request: AxiosRequest = {
      method: "post",
      url: Server_Routes.GET_POST_BY_ID,
      headers: {
        auth: getCookie("token"),
      },
      data: { postId },
    };
    return request;
  };

  static getChangePasswordRequest = (
    newPassword: string,
    token: string
  ): AxiosRequest => {
    const request: AxiosRequest = {
      method: "post",
      url: Server_Routes.CHANGE_PASSWORD,
      headers: {
        auth: token,
      },
      data: { password: newPassword },
    };
    return request;
  };

  static getUserByNameAndEmailRequest = (
    name: string,
    email: string
  ): AxiosRequest => {
    const request: AxiosRequest = {
      method: "post",
      url: Server_Routes.CHANGE_PASSWORD_AUTH,
      headers: {
        auth: getCookie("token"),
      },
      data: { name, email },
    };
    return request;
  };

  static getVotingRequest = (postId: string, vote: VoteEnum): AxiosRequest => {
    const request: AxiosRequest = {
      method: "post",
      url: Server_Routes.VOTE,
      headers: {
        auth: getCookie("token"),
      },
      data: { postId, vote },
    };
    return request;
  };

  static getAddCommentRequest = (
    content: string,
    username: string,
    postId: string
  ): AxiosRequest => {
    const request: AxiosRequest = {
      method: "post",
      url: Server_Routes.ADD_COMMENT,
      headers: {
        auth: getCookie("token"),
      },
      data: { content, username, postId },
    };
    return request;
  };
}
