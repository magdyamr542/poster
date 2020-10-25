import { Post, Comment } from "../interfaces/types";
import {
  ADD_COMMENT,
  ADD_POST,
  ADD_POSTS,
  CLEAR_POSTS,
  DELETE_POST,
  PostActionTypes,
  UPDATE_POST,
} from "./actionsTypes";
import { AppState } from "./types";
import { combineReducers } from "@reduxjs/toolkit";

const initialState: AppState = { posts: [] };
// a reducre takes the old state plus an action and returns the new state based on this action
export const postReducer = (
  state: AppState = initialState,
  action: PostActionTypes
): AppState => {
  switch (action.type) {
    /* adding a post */
    case ADD_POST:
      return { posts: [action.payload, ...state.posts] };

    /* deleting a post */
    case DELETE_POST:
      return { posts: state.posts.filter((p) => p._id !== action.payload._id) };

    /* updating a post */
    case UPDATE_POST:
      return {
        posts: state.posts.map((p) => {
          if (p._id === action.payload.postId) {
            return action.payload.newPost;
          }
          return p;
        }),
      };

    /* adding an array of posts */
    case ADD_POSTS:
      return {
        posts: [...state.posts, ...action.payload.posts],
      };
    /* adding a comment */
    case ADD_COMMENT:
      return addCommentUtil(
        state.posts,
        action.payload.newComment,
        action.payload.postId
      );

    /* clearing the posts */
    case CLEAR_POSTS:
      return { posts: [] };
    default:
      return state;
  }
};

// taking the new comment and the posts
const addCommentUtil = (
  posts: Post[] = [],
  newComment: Comment,
  postId: string
): AppState => {
  return {
    posts: posts.map((p) => {
      if (p._id !== postId) return p;
      const newComments: Comment[] = [...p.comments!, newComment];
      const newPost: Post = Object.assign({}, p, { comments: newComments });
      return newPost;
    }),
  };
};

// the main reducer given to the createStore function
export const rootReducer = combineReducers({
  posts: postReducer,
});
