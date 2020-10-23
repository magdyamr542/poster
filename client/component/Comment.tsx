import { Card, CardContent, Typography } from "@material-ui/core";
import * as React from "react";
import { GREY_COLOR } from "../consts";
import { parseDate } from "../utils";
import { Wrapper } from "./Wrapper";

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
        <span
          style={{
            marginRight: 12,
            fontWeight: "bold",
          }}
        >
          {username}
        </span>{" "}
        <span>{parseDate(createdAt!)}</span>
      </Typography>
      <p style={{ margin: 0 }}>{content}</p>
    </div>
  );
};
