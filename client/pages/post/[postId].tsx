import { NextPage } from "next";
import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Layout } from "../../component/Layout";
import { Post } from "../../component/Post";
import { ProgressWithMsg } from "../../component/ProgressWithMsg";
import { Post as PostInterface } from "../../interfaces/types";
import { addPost } from "../../redux/actionCreators";
import { store } from "../../redux/createStore";
import { AxiosRequestService } from "../../services/AxiosRequestService";
import { PostService } from "../../services/PostService";

interface PostPageProps {
  id: string;
}
const PostPage: NextPage<PostPageProps> = ({ id }) => {
  const postId = id;
  const [post, setPost] = useState<PostInterface | null>(null);

  const getPost = async (postId: string) => {
    const postRequest = AxiosRequestService.getGetPostByIdRequest(postId);
    const _post = await PostService.getPostById(postRequest);
    store.dispatch(addPost(_post));// saving the post that we got in the store
    setPost(_post);
  };

  useEffect(() => {
    getPost(postId);
    store.subscribe(() => {
      const postAfterBeingUpdatedForSomeUiReason = store
        .getState()
        .posts.posts.filter((p) => p._id === postId)[0];
      setPost(postAfterBeingUpdatedForSomeUiReason);
    });
  }, [postId]);

  if (!post) return <ProgressWithMsg msg={"loading the post..."} />;
  return (
    <>
      <Layout size={"normal"}>
        <Post
          userId={post.userId}
          content={post.content}
          title={post.title}
          username={post.username}
          createdAt={post.createdAt}
          _id={post._id}
          comments={post.comments}
          upVote={post.upVote}
          downVote={post.downVote}
          showMore={false}
        />
      </Layout>
    </>
  );
};

PostPage.getInitialProps = async ({ query }) => {
  const postId = query.postId as string;
  return { id: postId };
};

export default PostPage;
