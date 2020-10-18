import axios from "axios";
import { request } from "http";
import { AxiosRequest, Post } from "../interfaces/types";
import { AxiosRequestService } from "./AxiosRequestService";

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

  static addPost = async (request: AxiosRequest): Promise<Post> => {
    try {
      const response = await axios({
        url: request.url,
        method: request.method,
        headers: request.headers,
        data: request.data,
      });
      return response.data.post as Post;
    } catch (e) {
      console.log("Error", e);
      return { title: "", content: "", _id: "" };
    }
  };
}
