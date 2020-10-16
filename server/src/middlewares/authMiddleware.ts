import { NextFunction, Request, Response } from "express";
import * as fs from "fs";
import { verify } from "jsonwebtoken";
import { HTTPMSG, HTTPSTATUS, Roles } from "../dataShapes/enums";
import { jwtPayload } from "../dataShapes/interfaces";
import { Post } from "../models/Post.model";
import { User } from "../models/User.model";
import { generateToken } from "../utils/authUtils";

// checking the roles before accessing resources
export const checkRole = (roles: Roles[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // get the user by its id delivered to us from the checkJwt middleware
    const id: string = res.locals.userId;
    const user = await User.findById(id);
    if (!user) {
      res.status(HTTPSTATUS.NOT_FOUND).send({ msg: HTTPMSG.USER_NOT_FOUND });
      return;
    }
    // found the user
    let role = user.role;
    if (roles.indexOf(role!) == -1) {
      // this user does not have access to the entries.
      res
        .status(HTTPSTATUS.NOT_AUTHORIZED)
        .send({ msg: HTTPMSG.NOT_AUTHORIZED_TO_ACCESS_RECORDS });
      return;
    }

    // if authorized then call the handler
    next();
  };
};

// validating the jwt and sets the user id on the res locals
export const checkJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("in checkjwt");
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

/* Make sure only the admin or the one who created the post can actually delete it */
export const postDeleteAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if admin then let him do what he wants
  if (await isAdmin(res.locals.userId)) {
    next();
    return;
  }
  // if not then it should be the user who created this post to be able to delete it

  Post.findById({ _id: req.body.postId })
    .then((post) => {
      if (post && post.userId === res.locals.userId) {
        next();
        return;
      } else if (!post) {
        // the post is null and not found
        res
          .status(HTTPSTATUS.BAD_REQUEST)
          .send({ msg: HTTPMSG.POST_NOT_FOUND });
        return;
      } else {
        // the post is found but the use has no access
        res
          .status(HTTPSTATUS.NOT_AUTHORIZED)
          .send({ msg: HTTPMSG.NOT_AUTHORIZED_TO_ACCESS_RECORDS });
        return;
      }
    })
    .catch((e) => {
      res.status(HTTPSTATUS.BAD_REQUEST).send({ msg: HTTPMSG.DB_ERROR });
      return;
    });
};

const isAdmin = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    return false;
  }
  // found the user
  let role = user.role;
  if (role === Roles.ADMIN) return true;
  return false;
};
