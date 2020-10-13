export enum Roles {
  ADMIN = "ADMIN",
  NORMAL = "NORMAL",
}

export enum HTTPMSG {
  USER_EXISTS = "A user with these Details already exsists.",
  DB_ERROR = "The User could not be saved in the db",
  USER_CREATED = "The User was created successfully",
  ID_MISSING = "Please insert the user id to get the user",
  USER_NOT_FOUND = "There is no such user in the db",
  NOT_ABLE_TO_DELETE_USERS = "The Users could not be deleted",
  WRONG_PASSWORD = "Password is wrong",
  LOG_IN_SUCCESS = "User logged in successfully",
  TOKEN_NOT_VALID = "Your Token is not valid. you need to sign in",
  NOT_AUTHORIZED_TO_ACCESS_RECORDS = "Your are not authorized to access these records",
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
