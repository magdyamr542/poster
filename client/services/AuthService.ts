import { AuthResponse, AxiosRequest, CurrentUser } from "../interfaces/types";
import * as jsCookie from "js-cookie";
import axios from "axios";
import { parseJwtToken, getCookie } from "./cookieService";

/* logging in out and signing up the user */
export class AuthService {
  static signup = (req: AxiosRequest): Promise<AuthResponse> => {
    return new Promise<AuthResponse>(async (resolve, reject) => {
      try {
        const res = await axios({
          method: req.method,
          data: req.data,
          url: req.url,
        });
        resolve({
          msg: "User Signed up successfully" + res.headers["auth"],
          data: res.data,
          token: res.headers["token"],
        });
      } catch (e) {
        reject({ data: {}, msg: "User Could not be created", err: e });
      }
    });
  };

  static login = (req: AxiosRequest): Promise<AuthResponse> => {
    return new Promise<AuthResponse>(async (resolve, reject) => {
      try {
        const res = await axios({
          method: req.method,
          data: req.data,
          url: req.url,
        });
        resolve({
          msg: "User Signed In successfully , Redirecting to Home Page...",
          data: res.data,
          token: res.headers["token"],
        });
      } catch (e) {
        if (e.response) {
          reject({ data: {}, msg: e.response.data.err, err: e });
        }
      }
    });
  };

  static getCurrentLoggedInUser = (): CurrentUser | null => {
    if (process.browser) {
      const res = parseJwtToken(getCookie("token")!);
      return { username: res.username, id: res.id };
    }
    return null;
  };
}
