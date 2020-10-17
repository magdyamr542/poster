import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AxiosRequest, Post } from "../interfaces/types";
import { AxiosRequestService } from "../services/AxiosRequestService";
import { PostService } from "../services/PostService";
import { Post as PostComponent } from "./Post";
import { ProgressWithMsg } from "./ProgressWithMsg";

interface PostsProps {}
export const Posts: React.FC<PostsProps> = ({}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  // defined here because useEffect does not expect any async ops inside of it
  const fetchPosts = async (): Promise<Post[]> => {
    const request: AxiosRequest = AxiosRequestService.getAllPostsRequest();
    const _posts = await PostService.getAllPosts(request);
    return _posts;
  };

  const addPost = async (title: string, content: string) => {
    const request: AxiosRequest = AxiosRequestService.getAddPostRequest(
      title,
      content
    );
    const _post = await PostService.addPost(request);
    console.log(_post);
  };
  console.log("====================================");
  console.log(addPost);
  console.log("====================================");
  useEffect(() => {
    const _posts = fetchPosts()
      .then((d) => setPosts(d))
      .catch((e) => console.log("error from posts fetching ", e));
  }, []); // the empty array tells react to only make the api call once on mount and that is it
  console.log(posts);
  if (posts.length === 0) return <ProgressWithMsg msg={"loading posts..."} />;
  return (
    <>
      {posts.map((e) => {
        return (
          <PostComponent
            title={e.title}
            userId={e.userId}
            content={e.content}
            _id={e._id}
          ></PostComponent>
        );
      })}
    </>
  );
};
