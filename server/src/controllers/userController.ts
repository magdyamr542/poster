import { Request, Response } from "express";
import {
  HTTPMSG,
  HTTPSTATUS,
  PasswordHashing,
  Roles,
} from "../dataShapes/enums";
import { UserInterface } from "../dataShapes/interfaces";
import { User } from "../models/User.model";
import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../utils/authUtils";
import { sendEmail } from "../utils/sendEmail";
export class UserController {
  /* Add A User to the DB */
  static register = async (req: Request, res: Response) => {
    const { name, email, password, role }: UserInterface = req.body;
    // check if we have a common user in the db
    const similarUserExists = await UserController.checkIfUserExists(
      name,
      email
    );

    // do we have a similar user
    if (similarUserExists) {
      res.status(HTTPSTATUS.USER_CONFLICT).send({ err: HTTPMSG.USER_EXISTS });
      return;
    }
    // if not then hash the password and store it in the db
    let hashedPassword = await hashPassword(
      password,
      PasswordHashing.SALT_ROUNDS
    );
    let newUser = new User({ password: hashedPassword, email, name });
    if (role && role === Roles.ADMIN) newUser.role = role; // the normal rule will be set by default

    // try to save the user
    try {
      await newUser.save();
    } catch (e) {
      console.log(e);
      res.status(HTTPSTATUS.BAD_REQUEST).send({ err: HTTPMSG.DB_ERROR });
      return;
    }

    // everything is fine so we return the user
    res.status(HTTPSTATUS.SUCCESS).send({
      msg: HTTPMSG.USER_CREATED,
      user: UserController.getUserPublicFields(newUser),
    });
  };

  /* Log the user in and send him a jwt token */
  static login = async (req: Request, res: Response) => {
    const { name, email, password }: UserInterface = req.body;
    // check if we have a common user in the db
    const similarUserExists = await UserController.checkIfUserExists(
      name,
      email
    );

    // if no such user exists
    if (!similarUserExists) {
      res.status(HTTPSTATUS.NOT_FOUND).send({ err: HTTPMSG.USER_NOT_FOUND });
      return;
    }

    // if not then compare the given password with the stored hashed one
    const user = await User.findOne({ name, email });
    let arePasswordsTheSame = await comparePassword(password, user!.password);
    if (!arePasswordsTheSame) {
      res
        .status(HTTPSTATUS.NOT_AUTHORIZED)
        .send({ err: HTTPMSG.WRONG_PASSWORD });
      return;
    }

    // now all good. sign the token and log the user in
    const token = await generateToken({ username: user!.name, id: user!._id });
    res.setHeader("token", token);
    res.status(HTTPSTATUS.SUCCESS).send({ msg: HTTPMSG.LOG_IN_SUCCESS });
  };

  // Get all the users of the db
  static getAllUsers = async (req: Request, res: Response) => {
    let users = await User.find();
    User.find()
      .then((users) => {
        res
          .status(HTTPSTATUS.SUCCESS)
          .send({ users: users.map(UserController.getUserPublicFields) });
      })
      .catch((e) => {
        res.status(HTTPSTATUS.BAD_REQUEST).send({ err: HTTPMSG.DB_ERROR });
      });
  };

  /* Getting a user by its id */
  static getUserById = async (req: Request, res: Response) => {
    if (!req.body.id) {
      res.status(HTTPSTATUS.BAD_REQUEST).send({ err: HTTPMSG.ID_MISSING });
      return;
    }
    let id = req.body.id;
    let user = await User.findOne({ _id: id });
    if (!user) {
      res.status(HTTPSTATUS.NOT_FOUND).send({ err: HTTPMSG.USER_NOT_FOUND });
      return;
    }
    // here we found the user
    res
      .status(HTTPSTATUS.SUCCESS)
      .send({ user: UserController.getUserPublicFields(user) });
  };

  /* Getting a user by its id */
  static changePassword = async (req: Request, res: Response) => {
    const id = res.locals.userId;
    const { password } = req.body;
    let user = await User.findOne({ _id: id });
    if (!user) {
      res.status(HTTPSTATUS.NOT_FOUND).send({ err: HTTPMSG.USER_NOT_FOUND });
      return;
    }
    const hashedPassword = await hashPassword(
      password,
      PasswordHashing.SALT_ROUNDS
    );
    user
      .updateOne({ password: hashedPassword })
      .then((user) => {
        res
          .status(HTTPSTATUS.SUCCESS)
          .send({ user: UserController.getUserPublicFields(user) });
      })
      .catch((e) => {
        res.status(HTTPSTATUS.BAD_REQUEST).send({ msg: HTTPMSG.DB_ERROR });
      });
  };

  /* Getting a user by its id */
  static changePasswordAuth = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    let user = await User.findOne({ name, email });
    if (!user) {
      res.status(HTTPSTATUS.NOT_FOUND).send({ err: HTTPMSG.USER_NOT_FOUND });
      return;
    }

    // here we found the user and we send him the email
    const token = await generateToken({ username: user.name, id: user._id });
    const href = `http://localhost:4001/password/forgot-password/${token}`;
    const link = `<a href="${href}">reset-password</a>`;
    // try to send the email if worken then tell the user if not then the email of the user is not valid

    sendEmail(email as string, link)
      .then((e) => {
        res.setHeader("token", token); // the token should also be in the href of the link to be able to identify the user in the front end
        res
          .status(HTTPSTATUS.SUCCESS)
          .send({ user: UserController.getUserPublicFields(user!) });
        return;
      })
      .catch((e) => {
        res
          .status(HTTPSTATUS.BAD_REQUEST)
          .send({ msg: HTTPMSG.EMAIL_NOT_SEND });
      });
  };

  /* Deleting all users */
  static deleteAllUsers = async (req: Request, res: Response) => {
    User.deleteMany({})
      .then(() => {
        // here we found the user
        res
          .status(HTTPSTATUS.SUCCESS)
          .send({ msg: "All Users have been successfully deleted" });
      })
      .catch((e) => {
        // here we found the user
        res
          .status(HTTPSTATUS.BAD_REQUEST)
          .send({ err: HTTPMSG.NOT_ABLE_TO_DELETE_USERS });
      });
  };

  // checking if the user is in the db
  static checkIfUserExists = async (
    name: string,
    email: string
  ): Promise<boolean> => {
    const found = await User.find({ email, name });
    if (found && found.length !== 0) return true;
    return false;
  };

  /* projecting only the public fields of a user entitty */
  static getUserPublicFields = (user: UserInterface) => {
    return {
      name: user.name,
      email: user.email,
      role: user.role,
      _id: user._id,
    };
  };

  static getUserName = async (id: string): Promise<string> => {
    const name = await User.findById(id);
    if (name) return name.name;
    return "";
  };
}
