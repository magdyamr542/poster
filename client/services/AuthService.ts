import { AuthResponse, AxiosRequest } from "../interfaces/types";

import axios from "axios";
import { resolve } from "path";

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
        reject({ data: {}, msg: e.response.data.err, err: e });
      }
    });
  };
}
