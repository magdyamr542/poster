import { Card } from "@material-ui/core";
import * as React from "react";
import { GREY_COLOR } from "../consts";
import { Comment } from "../interfaces/types";
import { comment as CommentComponent } from "./Comment";
import { Wrapper } from "./Wrapper";
interface CommentsProps {
  comments?: Comment[];
}

export const Comments: React.FC<CommentsProps> = ({ comments }) => {
  return (
    <Wrapper size={"small"}>
      <Card style={{ padding: 12 }}>
        <h3>Comments</h3>
        <div className={"comments_container"} style={{}}>
          {comments?.map((c) => {
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
        </div>
      </Card>
    </Wrapper>
  );
};
