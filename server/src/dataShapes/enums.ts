export enum Roles {
  ADMIN = "ADMIN",
  NORMAL = "NORMAL",
}

export enum HTTPMSG {
  USER_EXISTS = "A user with these Details already exsists.",
  DB_ERROR = "Error with the Database",
  USER_CREATED = "The User was created successfully",
  ID_MISSING = "Please insert the user id to get the user",
  USER_NOT_FOUND = "There is no such user",
  NOT_ABLE_TO_DELETE_USERS = "The Users could not be deleted",
  WRONG_PASSWORD = "Password is wrong",
  LOG_IN_SUCCESS = "User logged in successfully",
  TOKEN_NOT_VALID = "Your Token is not valid. you need to sign in",
  NOT_AUTHORIZED_TO_ACCESS_RECORDS = "Your are not authorized to access these records",
  NO_ID_PROVIDED = "please provide the id of the user",
  POST_DB_ERROR = "Posts could not be retrieved from the db",
  POSTS_DELETED = "Posts were deleted successfully",
  POSTS_CREATION_ERROR = "The post could not be created",
  POST_CREATED = "The Post was created successfully",
  MISSING_ARGS = "Make sure to put the right data in the body of the request like the id!!",
  POST_DELETED = "Post was deleted successfully",
  POST_NOT_FOUND = "Post was not found",
}

export enum HTTPSTATUS {
  USER_CONFLICT = 409,
  BAD_REQUEST = 400,
  SUCCESS = 201,
  NOT_FOUND = 404,
  NOT_AUTHORIZED = 401,
  FORBIDDEN = 403,
}

export enum PasswordHashing {
  SALT_ROUNDS = 10,
}
