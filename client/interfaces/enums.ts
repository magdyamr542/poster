export enum Server_Routes {
  SIGN_UP = "http://localhost:4000/auth/register",
  LOG_IN = "http://localhost:4000/auth/login",
  LOG_OUT = "http://localhost:4000/auth/logout",
  GET_ALL_USERS = "http://localhost:4000/user/getUsers",
  GET_ALL_POSTS = "http://localhost:4000/post/getPosts",
  ADD_POST = "http://localhost:4000/post/addPost",
  DELETE_POST = "http://localhost:4000/post/deletePost",
  GET_POST_BY_ID = "http://localhost:4000/post/getPostById",
  GET_LIMITED_POSTS = "http://localhost:4000/post/getLimitedPosts",
}

export enum MsgInfoColors {
  SUCCESS = "green",
  FAILURE = "red",
}

export enum pageRoutes {
  SIGN_UP_PAGE = "/register",
  SIGN_IN_PAGE = "/login",
  HOME_PAGE = "/home",
}

export enum EventsEnum {
  POST_ADDED = "POST_ADDED",
  HIDE_POST = "HIDE_POST",
  DELETE_POST = "DELETE_POST",
}

export enum VotingColors {
  GREEN = "#7adb7a",
  RED = "RED",
  BLACK = "black",
}
