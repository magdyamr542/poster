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
  const [postsWhereUserWroteComment, setPostsWhereUserWroteComment] = useState<
    Post[] | null
  >(null);

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

  /* fetching the posts */
  useEffect(() => {
    getUsersPosts(userId);
    getPostsWhereUserWroteComment(userId);
  }, []);

  /* getting the posts where the user wrote comments */

  const getPostsWhereUserWroteComment = (userId: string) => {
    const request = AxiosRequestService.getGetPostsWhereUserWroteComment(
      userId
    );
    PostService.getPostsWhereUserWroteComment(request)
      .then((posts) => {
        setPostsWhereUserWroteComment(posts);
      })
      .catch((e) => {
        console.log(e);
      });
  };

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

  /* getting the number of the written posts by the user */
  const getNumberOfWrittenPosts = (posts: Post[] | null) => {
    if (!posts) return "-";
    return posts.length;
  };

  /* showing the email of the user only to the user or to the admins */
  const showEmailOfTheUser = () => {
    if (userId === loggedInUserId) return email;
    return "*******";
  };
  const loadedPosts = posts !== null;

  /* generating the markup */
  const postsHtml = (posts: Post[] | null) => {
    if (!posts || posts!.length === 0)
      return <InfoMsg color={"red"} msg={"no posts"} display={"block"} />;
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
                className="profile_email"
                style={{ fontWeight: "bold", fontSize: 20 }}
              >
                {showEmailOfTheUser()}
              </span>
            </div>

            {/* written posts */}
            <div className="writtenPosts">
              <span>Written Posts:</span>{" "}
              <span
                className="profile_writtenPosts"
                style={{ fontWeight: "bold", fontSize: 20 }}
              >
                {getNumberOfWrittenPosts(posts)}
              </span>
            </div>

            {/* posts commented on */}
            {/* written posts */}
            <div className="writtenPosts">
              <span>Posts Participated On :</span>{" "}
              <span
                className="profile_writtenPosts"
                style={{ fontWeight: "bold", fontSize: 20 }}
              >
                {getNumberOfWrittenPosts(postsWhereUserWroteComment)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="posts_of_user">
        <h1>Written Posts:</h1>
        {loadedPosts ? (
          postsHtml(posts)
        ) : (
          <InfoMsg msg={"loading posts.."} color={"red"} display={"block"} />
        )}
        <h1>Posts Commented On:</h1>
        {postsHtml(postsWhereUserWroteComment)}
      </div>
    </>
  );
};
