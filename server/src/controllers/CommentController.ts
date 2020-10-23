import { Request, Response } from "express";
import { HTTPMSG, HTTPSTATUS } from "../dataShapes/enums";
import { Comment } from "../models/Comment.model";
import { Post } from "../models/Post.model";

export class CommentController {
  /* getting all the posts */
  static addComment = async (req: Request, res: Response) => {
    const userId = res.locals.userId;
    const { postId, content, username } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      res.status(HTTPSTATUS.NOT_FOUND).send({ msg: HTTPMSG.POST_NOT_FOUND });
      return;
    }

    // make the comment
    const comment = new Comment({});
    comment.username = username;
    comment.content = content;
    comment.userId = userId;

    //save it to the post
    post.comments?.push(comment);
    post
      .save()
      .then((post) =>
        res.status(HTTPSTATUS.SUCCESS).send({ post, msg: "comment added" })
      )
      .catch((e) =>
        res.status(HTTPSTATUS.BAD_REQUEST).send({ msg: HTTPMSG.DB_ERROR })
      );
  };
}
