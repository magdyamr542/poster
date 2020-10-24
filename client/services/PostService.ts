import axios from "axios";
import { AxiosRequest, Post } from "../interfaces/types";
import { AuthService } from "./AuthService";

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

  static voteOnPost = async (request: AxiosRequest): Promise<Post> => {
    try {
      const response = await axios({
        url: request.url,
        method: request.method,
        headers: request.headers,
        data: request.data,
      });
      return response.data.post as Post;
    } catch (e) {
      console.log("Error on voting for the post", e);
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

  // check if the current user can delete this post
  static canDeletePost = (userId: string): boolean => {
    const currentUser = AuthService.getCurrentLoggedInUser();
    if (!currentUser) return false;
    return currentUser.id === userId;
  };
}
