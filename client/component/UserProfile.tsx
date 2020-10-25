import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import * as React from "react";
import { useState, useEffect } from "react";
import { GREY_COLOR } from "../consts";
import { Post } from "../interfaces/types";
import { addPosts, clearPosts } from "../redux/actionCreators";
import { store } from "../redux/createStore";
import { AxiosRequestService } from "../services/AxiosRequestService";
import { PostService } from "../services/PostService";
import { InfoMsg } from "./InfoMsg";
import { Post as PostComponent } from "./Post";

interface UserProfileProps {
  userId: string;
  username: string;
  email: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  userId,
  username,
  email,
}) => {
  const [posts, setPosts] = useState<Post[] | null>(null);

  // listen for any changes on the redux store
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setPosts(store.getState().posts.posts);
    });
    /* clear the posts when you are done */
    return () => {
      store.dispatch(clearPosts());
    };
  }, []);
  const getUsersPosts = async (userId: string) => {
    const request = AxiosRequestService.getGetPostsOfUserRequest(userId);
    PostService.getPostsOfUser(request)
      .then((posts) => {
        store.dispatch(addPosts(posts));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const postsHtml = () => {
    if (posts!.length === 0)
      return (
        <InfoMsg
          color={"red"}
          msg={username + ` has no posts`}
          display={"block"}
        />
      );
    return (
      <div>
        {posts?.map((e, i) => {
          return (
            <PostComponent
              title={e.title}
              content={e.content}
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
      </div>
    );
  };

  useEffect(() => {
    getUsersPosts(userId);
  }, []);

  const loadedPosts = posts !== null;
  return (
    <>
      <Card>
        <CardContent>
          <div className="user_profile_container">
            <div className="username">
              {/* username */}
              <span>username:</span>{" "}
              <span
                className="profile_username"
                style={{ fontWeight: "bold", fontSize: 20 }}
              >
                {username}
              </span>
            </div>
            {/* email */}
            <div className="email">
              <span>email:</span>{" "}
              <span
                className="profile_username"
                style={{ fontWeight: "bold", fontSize: 20 }}
              >
                {email}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="posts_of_user">
        {loadedPosts ? (
          postsHtml()
        ) : (
          <InfoMsg msg={"loading posts.."} color={"red"} display={"block"} />
        )}
      </div>
    </>
  );
};
