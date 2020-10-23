import { Card, IconButton } from "@material-ui/core";
import * as React from "react";
import { AxiosRequest, Comment } from "../interfaces/types";
import { comment as CommentComponent } from "./Comment";
import { Wrapper } from "./Wrapper";
import TextInput from "./TextInput";
import { useState } from "react";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { AxiosRequestService } from "../services/AxiosRequestService";
import { CommentService } from "../services/CommentService";
interface CommentsProps {
  comments?: Comment[];
  display: boolean;
  username?: string;
  postId?: string;
}

export const Comments: React.FC<CommentsProps> = ({
  comments,
  display,
  username,
  postId,
}) => {
  const [commentValue, setCommentValue] = useState<string>("");
  const [myComments, setMyComments] = useState<Comment[]>(comments!);

  const addComment = async () => {
    const request: AxiosRequest = AxiosRequestService.getAddCommentRequest(
      commentValue,
      username!,
      postId!
    );
    console.log(request);
    CommentService.addComment(request)
      .then((post) => {
        console.log("added comment!");
        setMyComments((old) => post.comments!);
        setCommentValue("");
      })
      .catch((e) => {});
  };
  return (
    <div
      className={"comments_container"}
      style={{ display: display ? "block" : "none" }}
    >
      <Wrapper size={"small"}>
        <Card style={{ padding: 12 }}>
          <h3>Comments</h3>
          {myComments?.map((c) => {
            return (
              <CommentComponent
                content={c.content}
                userId={c.userId}
                username={c.username}
                _id={c._id}
                createdAt={c.createdAt}
              />
            );
          })}
          <div className="addComment" style={{ display: "flex" }}>
            <TextInput
              label={"add comment"}
              name={"add comment"}
              value={commentValue}
              selector={"add_comment_container"}
              onValueChange={(e) => setCommentValue(e as string)}
              required={true}
            ></TextInput>
            <IconButton title={"add comment"} onClick={addComment}>
              <ChatBubbleOutlineIcon />
            </IconButton>
          </div>
        </Card>
      </Wrapper>
    </div>
  );
};
