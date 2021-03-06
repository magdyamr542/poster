export enum Server_Routes {
  SIGN_UP = "http://localhost:4000/auth/register",
  LOG_IN = "http://localhost:4000/auth/login",
  LOG_OUT = "http://localhost:4000/auth/logout",
  GET_ALL_USERS = "http://localhost:4000/user/getUsers",
  GET_USER_BY_ID = "http://localhost:4000/user/getUserById",
  CHANGE_PASSWORD_AUTH = "http://localhost:4000/user/changePasswordAuth",
  GET_ALL_POSTS = "http://localhost:4000/post/getPosts",
  ADD_POST = "http://localhost:4000/post/addPost",
  DELETE_POST = "http://localhost:4000/post/deletePost",
  GET_POST_BY_ID = "http://localhost:4000/post/getPostById",
  GET_POSTS_OF_USER = "http://localhost:4000/post/getPostsOfUser",
  GET_LIMITED_POSTS = "http://localhost:4000/post/getLimitedPosts",
  GET_POSTS_WHERE_USER_WROTE_COMMENT = "http://localhost:4000/post/getPostsWhereUserWroteComment",
  CHANGE_PASSWORD = "http://localhost:4000/user/changePassword",
  VOTE = "http://localhost:4000/post/vote",
  ADD_COMMENT = "http://localhost:4000/comment/addComment",
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
  COMMENT_ADDED = "COMMENT_ADDED",
}

export enum VotingColors {
  GREEN = "#7adb7a",
  RED = "RED",
  BLACK = "black",
}

export enum VoteEnum {
  UP = "UP",
  DOWN = "DOWN",
}
