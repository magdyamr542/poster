import { Request, Response } from "express";
import { HTTPMSG, HTTPSTATUS, VotingEnum } from "../dataShapes/enums";
import { PostInterface } from "../dataShapes/interfaces";
import { Post } from "../models/Post.model";
import { UserController } from "./userController";

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

  /* getting a post by its id */
  static getPostById = async (req: Request, res: Response) => {
    const postId = req.body.postId;
    Post.findById(postId)
      .then((post) => res.status(HTTPSTATUS.SUCCESS).send({ post }))
      .catch((e) =>
        res.status(HTTPSTATUS.NOT_FOUND).send({ msg: HTTPMSG.POST_NOT_FOUND })
      );
  };

  /* getting posts where that the user commeted on*/
  static getPostsWhereUserWroteComment = async (
    req: Request,
    res: Response
  ) => {
    const userId = req.body.userId;
    Post.find({
      $and: [{ "comments.userId": userId }, { userId: { $ne: userId } }], // get me all the posts which the user commented on but not their own posts
    })
      .sort({ createdAt: -1 })
      .then((posts) => res.status(HTTPSTATUS.SUCCESS).send({ posts }))
      .catch((e) =>
        res.status(HTTPSTATUS.BAD_REQUEST).send({ msg: HTTPMSG.DB_ERROR })
      );
  };

  /* getting a post by its id */
  static vote = async (req: Request, res: Response) => {
    const vote: VotingEnum = req.body.vote;
    const postId = req.body.postId;
    const post = await Post.findById(postId);
    // if post not found you cannot vote on it
    if (!post) {
      res.status(HTTPSTATUS.NOT_FOUND).send({ msg: HTTPMSG.POST_NOT_FOUND });
      return;
    }
    // update the votes of the post
    const isUpVote = vote === VotingEnum.UP;
    if (isUpVote) {
      post.upVote = post.upVote! + 1;
    } else {
      post.downVote = post.downVote! - 1;
    }

    Post.findOneAndUpdate(
      { _id: postId },
      { downVote: post.downVote, upVote: post.upVote },
      { new: true },
      undefined
    )
      .then((pst) => {
        res
          .status(HTTPSTATUS.SUCCESS)
          .send({ post: pst, msg: "voted on the post successfully" });
      })
      .catch((e) => {
        res
          .status(HTTPSTATUS.BAD_REQUEST)
          .send({ msg: "could not save the voting to the db" });
      });
  };

  /* getting a limited number of posts from the db */
  static getLimitedPosts = async (req: Request, res: Response) => {
    const { skip, postCount } = req.body;

    Post.aggregate([
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: postCount,
      },
    ])
      .then((posts) => {
        res
          .status(HTTPSTATUS.SUCCESS)
          .send({ posts, currentlyAt: skip + postCount });
      })
      .catch((e) => {
        res
          .status(HTTPSTATUS.BAD_REQUEST)
          .send({ err: e, msg: HTTPMSG.DB_ERROR });
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
    const userId: string = req.body.userId;
    Post.find({ userId })
      .sort({ createdAt: -1 })
      .then((posts) => res.status(HTTPSTATUS.SUCCESS).send({ posts }))
      .catch((e) =>
        res.status(HTTPSTATUS.BAD_REQUEST).send({ msg: HTTPMSG.POST_DB_ERROR })
      );
  };

  /* Adding a post to the db */
  static addPost = async (req: Request, res: Response) => {
    const { content, title }: PostInterface = req.body;
    let newPost = new Post({});
    newPost.content = content;
    newPost.userId = res.locals.userId as string;
    const username = await UserController.getUserName(res.locals.userId); // attach the user name to the post
    newPost.username = username;
    if (title) newPost.title = title;
    // save the post
    newPost
      .save()
      .then((post) => res.status(HTTPSTATUS.SUCCESS).send({ post: post }))
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
            .send({ msg: HTTPMSG.POST_DELETED, post });
      })
      .catch((e) => {
        res.status(HTTPSTATUS.BAD_REQUEST).send({ msg: HTTPMSG.DB_ERROR });
      });
  };
}
