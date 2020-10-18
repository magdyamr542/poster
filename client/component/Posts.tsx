import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { EventEmitter } from "../EventEmitter";
import { EventsEnum } from "../interfaces/enums";
import { AxiosRequest, Post } from "../interfaces/types";
import { AxiosRequestService } from "../services/AxiosRequestService";
import { PostService } from "../services/PostService";
import { InfoMsg } from "./InfoMsg";
import { Post as PostComponent } from "./Post";
import { ProgressWithMsg } from "./ProgressWithMsg";

interface PostsProps {
  postEmitter: EventEmitter<Post>;
}
export const Posts: React.FC<PostsProps> = ({ postEmitter }) => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  // defined here because useEffect does not expect any async ops inside of it
  const fetchPosts = async (): Promise<Post[]> => {
    const request: AxiosRequest = AxiosRequestService.getAllPostsRequest();
    const _posts = await PostService.getAllPosts(request);
    return _posts;
  };

  const hidePost = (postId: string) => {
    console.log(postId);
    setPosts((oldPosts) => oldPosts!.filter((post) => post._id !== postId));
  };

  // run this subscription only once at the first time
  useEffect(() => {
    // if there are handlers dut to component refreshing then do not subscribe
    if (postEmitter.getListenersByName(EventsEnum.POST_ADDED).length == 0) {
      /* listen for adding a new post */
      postEmitter.on(EventsEnum.POST_ADDED, (post) => {
        setPosts((old) => (old === null ? [post] : [post, ...old]));
      });
    }

    if (postEmitter.getListenersByName(EventsEnum.HIDE_POST).length == 0) {
      /* listen for hiding a post */
      postEmitter.on(EventsEnum.HIDE_POST, (post) => {
        hidePost(post._id);
      });
    }
  }, [postEmitter]);

  useEffect(() => {
    const _posts = fetchPosts()
      .then((d) => setPosts(d.reverse()))
      .catch((e) => console.log("error from posts fetching ", e));
  }, []); // the empty array tells react to only make the api call once on mount and that is it
  if (!posts) return <ProgressWithMsg msg={"loading posts..."} />;
  if (posts.length === 0)
    return <InfoMsg msg={"There are no posts"} color={"red"} />;
  return (
    <>
      {posts.map((e, i) => {
        return (
          <PostComponent
            title={e.title}
            content={e.content}
            _id={e._id}
            key={i}
            username={e.username}
            postEmitter={postEmitter}
          ></PostComponent>
        );
      })}
    </>
  );
};
