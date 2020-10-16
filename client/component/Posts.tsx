import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AxiosRequest, Post } from "../interfaces/types";
import { AxiosRequestService } from "../services/AxiosRequestService";
import { PostService } from "../services/PostService";

interface PostsProps {}
export const Posts: React.FC<PostsProps> = ({}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  // defined here because useEffect does not expect any async ops inside of it
  const fetchPosts = async (): Promise<Post[]> => {
    const request: AxiosRequest = AxiosRequestService.getAllPostsRequest();
    const _posts = await PostService.getAllPosts(request);
    return _posts;
  };
  useEffect(() => {
    const _posts = fetchPosts()
      .then((d) => setPosts(d))
      .catch((e) => console.log("error from posts fetching ", e));
  }, []); // the empty array tells react to only make the api call once on mount and that is it
  console.log(posts);
  return <div> hello </div>;
};
