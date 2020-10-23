import axios from "axios";
import { AxiosRequest, Post } from "../interfaces/types";

export class CommentService {
  static addComment = async (request: AxiosRequest): Promise<Post> => {
    try {
      const response = await axios({
        url: request.url,
        method: request.method,
        headers: request.headers,
        data: request.data,
      });
      return response.data.post as Post;
    } catch (e) {
      console.log("Error adding a comment", e);
      return { title: "", content: "", _id: "", userId: "" };
    }
  };
}
