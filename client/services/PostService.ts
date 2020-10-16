import axios from "axios";
import { AxiosRequest, Post } from "../interfaces/types";

export class PostService {
  static getAllPosts = async (request: AxiosRequest): Promise<Post[]> => {
    try {
      const response = await axios({
        url: request.url,
        method: request.method,
        headers: request.headers,
      });
      return response.data.posts as Post[];
    } catch (e) {
      console.log("Error", e);
      return [];
    }
  };
}
