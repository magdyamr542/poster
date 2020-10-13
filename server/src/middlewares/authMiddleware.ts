import { NextFunction, Request, Response } from "express";
import * as fs from "fs";
import { verify } from "jsonwebtoken";
import { HTTPMSG, HTTPSTATUS, Roles } from "../dataShapes/enums";
import { jwtPayload } from "../dataShapes/interfaces";
import { User } from "../models/User.model";
import { generateToken } from "../utils/authUtils";

// checking the roles before accessing resources
export const checkRole = (roles: Roles[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // get the user by its id delivered to us from the checkJwt middleware
    const id = res.locals.userId;
    const user = await User.findById(id);
    if (!user) {
      res.status(HTTPSTATUS.NOT_FOUND).send({ msg: HTTPMSG.USER_NOT_FOUND });
      return;
    }
    // found the user
    let role = user.role;
    if (roles.indexOf(role!) == -1) {
      // this user does not have access to the entries.
      console.log("my role", role, user);

      res
        .status(HTTPSTATUS.NOT_AUTHORIZED)
        .send({ msg: HTTPMSG.NOT_AUTHORIZED_TO_ACCESS_RECORDS });

      console.log("this is bad some times wsf   sdffe ");
    }

    // if authorized then call the handler
    next();
  };
};

// validating the jwt
export const checkJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get the token
  let token = req.headers["auth"] as string;
  let jwtPayload: jwtPayload;
  try {
    let pubKey = fs.readFileSync("./src/utils/public.key", "utf-8");
    jwtPayload = verify(token!, pubKey) as jwtPayload;
    res.locals.userId = jwtPayload.id;
  } catch (e) {
    //If token is not valid, respond with 401 (unauthorized)
    res
      .status(HTTPSTATUS.NOT_AUTHORIZED)
      .send({ msg: HTTPMSG.TOKEN_NOT_VALID });
    return;
  }
  // resend the token one more time
  const newToken = await generateToken(jwtPayload);
  res.setHeader("token", newToken);
  next(); // call the next function
};
