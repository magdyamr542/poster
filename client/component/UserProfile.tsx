import { Card, CardContent } from "@material-ui/core";
import * as React from "react";
import { useState, useEffect } from "react";
import { Post } from "../interfaces/types";
import { addPosts, clearPosts } from "../redux/actionCreators";
import { store } from "../redux/createStore";
import { AxiosRequestService } from "../services/AxiosRequestService";
import { getCookieContent } from "../services/cookieService";
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
  /* vars */
  const [posts, setPosts] = useState<Post[] | null>(null);
  const loggedInUserId = getCookieContent("token").id;

  // listen for any changes on the redux store
  useEffect(() => {
    store.subscribe(() => {
      setPosts(store.getState().posts.posts);
    });
    /* clear the posts when you are done */
    return () => {
      store.dispatch(clearPosts());
    };
  }, []);

  /* getting the posts */
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

  useEffect(() => {
    getUsersPosts(userId);
  }, []);

  /* getting the number of the written posts by the user */
  const getNumberOfWrittenPosts = () => {
    if (!posts) return "-";
    return posts.length;
  };

  /* showing the email of the user only to the user or to the admins */
  const showEmailOfTheUser = () => {
    if (userId === loggedInUserId) return email;
    return "*******";
  };
  /* getting the number of the posts that this user has commented on */
  const loadedPosts = posts !== null;

  /* generating the markup */
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
                {showEmailOfTheUser()}
              </span>
            </div>

            {/* written posts */}
            {/* email */}
            <div className="email">
              <span>Written Posts:</span>{" "}
              <span
                className="profile_username"
                style={{ fontWeight: "bold", fontSize: 20 }}
              >
                {getNumberOfWrittenPosts()}
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
