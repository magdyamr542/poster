import { Comment, Post } from "../interfaces/types";

export const ADD_POST = "ADD_POST";
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const ADD_POSTS = "ADD_POSTS";

/* action type */
interface ADD_POST_ACTION {
  type: typeof ADD_POST;
  payload: Post;
}

interface DELETE_POST_ACTION {
  type: typeof DELETE_POST;
  payload: Post;
}

interface UPDATE_POST_ACTION {
  type: typeof UPDATE_POST;
  payload: {
    postId: string;
    newPost: Post;
  };
}

interface ADD_POSTS_ACTION {
  type: typeof ADD_POSTS;
  payload: {
    posts: Post[];
  };
}

interface ADD_COMMENT_ACTION {
  type: typeof ADD_COMMENT;
  payload: {
    newComment: Comment;
    postId: string;
  };
}

/* action creators */
export type PostActionTypes =
  | ADD_POST_ACTION
  | DELETE_POST_ACTION
  | ADD_COMMENT_ACTION
  | UPDATE_POST_ACTION
  | ADD_POSTS_ACTION;
