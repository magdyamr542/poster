import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import * as React from "react";
import { useState, useEffect } from "react";
import { MAX_CONTENT_LENGTH_TO_SHOW_IN_HOME_PAGE } from "../consts";
import { EventEmitter } from "../EventEmitter";
import { EventsEnum, pageRoutes } from "../interfaces/enums";
import { Post } from "../interfaces/types";
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
  const [currentlyAt, setCurrentlyAt] = useState(0); // at the beginning we skip 0 posts
  const [displayLoadMorePostsBtn, setDisplayLoadMorePostsBtn] = useState<
    boolean
  >(true);
  const router = useRouter();

  /* hide a post */
  const hidePost = (postId: string) => {
    setPosts((oldPosts) => oldPosts!.filter((post) => post._id !== postId));
  };

  /* delete the post entirely from the db */
  const deletePost = async (postId: string) => {
    const deleteRequest = AxiosRequestService.getDeletePostRequest(postId);
    const deletedPost = await PostService.deletePost(deleteRequest);
    if (deletedPost._id.length == 0) {
      // we got an error so we need to login
      router.push(pageRoutes.SIGN_IN_PAGE);
      return;
    }
    hidePost(deletedPost._id);
  };

  const getLimitedPosts = (skip: number) => {
    const request = AxiosRequestService.getLimitedPostsRequest(skip);
    return PostService.getLimitedPosts(request);
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

    if (postEmitter.getListenersByName(EventsEnum.DELETE_POST).length == 0) {
      /* listen for removing a post */
      postEmitter.on(EventsEnum.DELETE_POST, (post) => {
        deletePost(post._id);
      });
    }
  }, [postEmitter]);

  /* loading more posts when the user clicks the load more button */
  const handleLoadMorePosts = () => {
    getLimitedPosts(currentlyAt)
      .then((d) => {
        setPosts((old) => [...old!, ...d.posts]);
        setCurrentlyAt(d.currentlyAt);
        setDisplayLoadMorePostsBtn(d.posts.length !== 0);
      })
      .catch((e) => console.log("error from getting more posts", e));
  };

  useEffect(() => {
    const _posts = getLimitedPosts(0)
      .then((d) => {
        // set the posts and mark where we are currently at
        setPosts(d.posts);
        setCurrentlyAt(d.currentlyAt);
      })
      .catch((e) => console.log("error from posts fetching ", e));
  }, []); // the empty array tells react to only make the api call once on mount and that is it
  if (!posts) return <ProgressWithMsg msg={"loading posts..."} />;
  if (posts.length === 0)
    return <InfoMsg msg={"There are no posts"} color={"red"} />;
  return (
    <>
      {posts.map((e, i) => {
        // do not show the full text
        let content = e.content;

        if (content.length > MAX_CONTENT_LENGTH_TO_SHOW_IN_HOME_PAGE) {
          content = content.substring(
            0,
            MAX_CONTENT_LENGTH_TO_SHOW_IN_HOME_PAGE
          );
          content += " ....";
        }
        return (
          <PostComponent
            title={e.title}
            content={content}
            _id={e._id}
            key={i}
            username={e.username}
            postEmitter={postEmitter}
            userId={e.userId}
            createdAt={e.createdAt!}
            upVote={e.upVote}
            downVote={e.downVote}
          ></PostComponent>
        );
      })}
      <Button
        variant={"contained"}
        color="primary"
        style={{
          margin: "20px auto",
          padding: "8px 16px",
          display: displayLoadMorePostsBtn ? "block" : "none",
        }}
        onClick={handleLoadMorePosts}
      >
        load more posts...
      </Button>
      <InfoMsg
        msg={"no more posts ..."}
        color="black"
        display={displayLoadMorePostsBtn ? "none" : "block"}
      />
    </>
  );
};
