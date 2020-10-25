import { Typography } from "@material-ui/core";
import * as React from "react";
import { GREY_COLOR } from "../consts";
import { PostService } from "../services/PostService";
import { parseDate } from "../utils";
import { UsernameLink } from "./UsernameLink";

export interface CommentProps {
  content: string;
  createdAt?: Date;
  username: string;
  _id: string;
  userId: string;
}

export const comment: React.FC<CommentProps> = ({
  content,
  createdAt,
  username,
  _id,
  userId,
}) => {
  // check if the user who wrote this comment is the currently logged in user
  const canDeletePost = PostService.canDeletePost(userId);
  return (
    <div
      className={"comment_container"}
      style={{
        background: "#F0F2F5",
        border: "1px solid #F0F2F5",
        borderRadius: 15,
        margin: "12px 0px",
        padding: 12,
      }}
    >
      <Typography variant="subtitle1" color={"textSecondary"}>
        <UsernameLink
          color={canDeletePost ? "#3f51b5" : GREY_COLOR}
          username={username}
          userId={userId}
        />
        <span>{parseDate(createdAt!)}</span>
      </Typography>
      <p style={{ margin: 0, marginTop: 5 }}>{content}</p>
    </div>
  );
};
