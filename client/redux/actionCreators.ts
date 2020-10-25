import { Comment, Post } from "../interfaces/types";
import {
  PostActionTypes,
  ADD_POST,
  DELETE_POST,
  ADD_COMMENT,
  UPDATE_POST,
  ADD_POSTS,
  CLEAR_POSTS,
} from "./actionsTypes";

export const addPost = (post: Post): PostActionTypes => {
  return {
    type: ADD_POST,
    payload: post,
  };
};

export const deletePost = (post: Post): PostActionTypes => {
  return {
    type: DELETE_POST,
    payload: post,
  };
};

export const updatePost = (postId: string, newPost: Post): PostActionTypes => {
  return {
    type: UPDATE_POST,
    payload: {
      postId,
      newPost,
    },
  };
};

export const addPosts = (posts: Post[]): PostActionTypes => {
  return {
    type: ADD_POSTS,
    payload: {
      posts,
    },
  };
};

export const clearPosts = (): PostActionTypes => {
  return {
    type: CLEAR_POSTS,
  };
};

export const addComment = (
  comment: Comment,
  postId: string
): PostActionTypes => {
  return {
    type: ADD_COMMENT,
    payload: {
      newComment: comment,
      postId,
    },
  };
};
