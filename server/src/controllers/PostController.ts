import { Request, Response } from "express";
import { HTTPMSG, HTTPSTATUS } from "../dataShapes/enums";
import { PostInterface } from "../dataShapes/interfaces";
import { Post } from "../models/Post.model";

export class PostController {
  /* getting all the posts */
  static getPosts = async (req: Request, res: Response) => {
    Post.find()
      .select("-__v")
      .then((posts) => {
        res.status(HTTPSTATUS.SUCCESS).send({ posts });
      })
      .catch((e) => {
        res.status(HTTPSTATUS.BAD_REQUEST).send({ msg: HTTPMSG.POST_DB_ERROR });
      });
  };

  /* Deleting all the posts of the db */
  static deletePosts = async (req: Request, res: Response) => {
    await Post.deleteMany({});
    res.status(HTTPSTATUS.SUCCESS).send({
      msg: HTTPMSG.POSTS_DELETED,
    });
  };

  /* Getting the posts to a specific user */
  static getPostsOfUser = (req: Request, res: Response) => {
    const userId: string = res.locals.userId; // todo . get the user id from the session
    Post.find({ userId })
      .then((posts) => res.status(HTTPSTATUS.SUCCESS).send({ posts }))
      .catch((e) =>
        res.status(HTTPSTATUS.BAD_REQUEST).send({ msg: HTTPMSG.POST_DB_ERROR })
      );
  };

  /* Adding a post to the db */
  static addPost = (req: Request, res: Response) => {
    const { content, title }: PostInterface = req.body;
    let newPost = new Post({});
    newPost.content = content;
    newPost.userId = res.locals.userId as string;
    if (title) newPost.title = title;
    console.log(newPost);
    // save the post
    newPost
      .save()
      .then((post) =>
        res
          .status(HTTPSTATUS.SUCCESS)
          .send({ msg: HTTPMSG.POST_CREATED, post: post })
      )
      .catch((e) =>
        res
          .status(HTTPSTATUS.BAD_REQUEST)
          .send({ msg: HTTPMSG.POSTS_CREATION_ERROR })
      );
  };

  /* Getting the posts to a specific user */
  static deletePost = (req: Request, res: Response) => {
    const postId = req.body.postId;
    if (!postId) {
      res.status(HTTPSTATUS.BAD_REQUEST).send({ msg: HTTPMSG.MISSING_ARGS });
      return;
    }
    Post.findOneAndRemove({ _id: postId })
      .then((post) => {
        if (!post) {
          res
            .status(HTTPSTATUS.BAD_REQUEST)
            .send({ msg: HTTPMSG.POST_NOT_FOUND });
        } else
          res
            .status(HTTPSTATUS.SUCCESS)
            .send({ msg: HTTPMSG.POST_DELETED, deletedPost: post });
      })
      .catch((e) => {
        res.status(HTTPSTATUS.BAD_REQUEST).send({ msg: HTTPMSG.DB_ERROR });
      });
  };
}
