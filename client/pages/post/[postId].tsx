import { NextPage } from "next";
import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Layout } from "../../component/Layout";
import { Post } from "../../component/Post";
import { ProgressWithMsg } from "../../component/ProgressWithMsg";
import { Post as PostInterface } from "../../interfaces/types";
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
    setPost(_post);
  };

  useEffect(() => {
    getPost(postId);
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
