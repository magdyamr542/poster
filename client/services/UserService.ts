import { AxiosRequest, User } from "../interfaces/types";
import axios from "axios";

export class UserService {
  static getUserById = async (request: AxiosRequest): Promise<User> => {
    try {
      const response = await axios({
        url: request.url,
        method: request.method,
        headers: request.headers,
        data: request.data,
      });
      return response.data.user as User;
    } catch (e) {
      console.log("Error", e);
      return { name: "", email: "", role: "" };
    }
  };
}
