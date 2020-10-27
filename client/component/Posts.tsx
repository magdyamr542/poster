import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import * as React from "react";
import { useState, useEffect } from "react";
import { MAX_CONTENT_LENGTH_TO_SHOW_IN_HOME_PAGE } from "../consts";
import { Post } from "../interfaces/types";
import { addPosts, clearPosts } from "../redux/actionCreators";
import { store } from "../redux/createStore";
import { AxiosRequestService } from "../services/AxiosRequestService";
import { PostService } from "../services/PostService";
import { InfoMsg } from "./InfoMsg";
import { Post as PostComponent } from "./Post";
import { ProgressWithMsg } from "./ProgressWithMsg";

interface PostsProps {}
export const Posts: React.FC<PostsProps> = ({}) => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [currentlyAt, setCurrentlyAt] = useState(0); // at the beginning we skip 0 posts
  const [displayLoadMorePostsBtn, setDisplayLoadMorePostsBtn] = useState<
    boolean
  >(true);
  const router = useRouter();

  // use pagination
  const getLimitedPosts = (skip: number) => {
    const request = AxiosRequestService.getLimitedPostsRequest(skip);
    return PostService.getLimitedPosts(request);
  };

  /* subscribe to redux store */
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // whenever the posts change
      setPosts(store.getState().posts.posts);
    });
    return () => {
      store.dispatch(clearPosts());
    };
  }, []);

  /* loading more posts when the user clicks the load more button */
  const handleLoadMorePosts = () => {
    getLimitedPosts(currentlyAt)
      .then((d) => {
        store.dispatch(addPosts(d.posts));
        setCurrentlyAt(d.currentlyAt);
        setDisplayLoadMorePostsBtn(d.posts.length !== 0);
      })
      .catch((e) => console.log("error from getting more posts", e));
  };

  useEffect(() => {
    const _posts = getLimitedPosts(0)
      .then((d) => {
        // set the posts and mark where we are currently at
        store.dispatch(addPosts(d.posts));
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
            userId={e.userId}
            createdAt={e.createdAt!}
            upVote={e.upVote}
            downVote={e.downVote}
            comments={e.comments || []}
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
