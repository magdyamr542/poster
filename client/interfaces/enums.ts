export enum Server_Routes {
  SIGN_UP = "http://localhost:4000/auth/register",
  LOG_IN = "http://localhost:4000/auth/login",
  LOG_OUT = "http://localhost:4000/auth/logout",
  GET_ALL_USERS = "http://localhost:4000/user/getUsers",
  GET_ALL_POSTS = "http://localhost:4000/post/getPosts",
  ADD_POST = "http://localhost:4000/post/addPost",
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
