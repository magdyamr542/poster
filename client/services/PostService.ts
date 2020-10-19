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
      return { title: "", content: "", _id: "", userId: "" };
    }
  };

  static getLimitedPosts = async (
    request: AxiosRequest
  ): Promise<{ posts: Post[]; currentlyAt: number }> => {
    try {
      const response = await axios({
        url: request.url,
        method: request.method,
        headers: request.headers,
        data: request.data,
      });
      return {
        posts: response.data.posts as Post[],
        currentlyAt: response.data.currentlyAt,
      };
    } catch (e) {
      console.log("Error", e);
      return { posts: [], currentlyAt: -1 };
    }
  };

  static deletePost = async (request: AxiosRequest): Promise<Post> => {
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
      return { title: "", content: "", _id: "", userId: "" };
    }
  };

  static getPostById = async (request: AxiosRequest): Promise<Post> => {
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
      return { title: "", content: "", _id: "", userId: "" };
    }
  };
}
