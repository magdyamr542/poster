import * as React from "react";
import {
  AxiosRequest,
  Comment,
  Post as PostInterface,
} from "../interfaces/types";
import { comment as CommentComponent } from "./Comment";
import { Wrapper } from "./Wrapper";
import TextInput from "./TextInput";
import { useState } from "react";
import { AxiosRequestService } from "../services/AxiosRequestService";
import { CommentService } from "../services/CommentService";
import { getCookieContent } from "../services/cookieService";
import { store } from "../redux/createStore";
import { addComment as addCommentAction } from "../redux/actionCreators";

interface CommentsProps {
  comments?: Comment[];
  display: boolean;
  postId?: string;
}

export const Comments: React.FC<CommentsProps> = ({
  comments,
  display,
  postId,
}) => {
  const [commentValue, setCommentValue] = useState<string>("");

  const addComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = getCookieContent("token").username;
    const request: AxiosRequest = AxiosRequestService.getAddCommentRequest(
      commentValue,
      username!,
      postId!
    );
    CommentService.addComment(request)
      .then((post) => {
        store.dispatch(
          addCommentAction(post.comments![post.comments!.length - 1], post._id)
        );
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
        <div
          style={{
            padding: 12,
          }}
        >
          <h3>Comments</h3>
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
          <div className="addComment" style={{ display: "flex" }}>
            <form onSubmit={addComment} style={{ width: "60%" }}>
              <TextInput
                label={"add comment"}
                name={"add comment"}
                value={commentValue}
                selector={"add_comment_container"}
                onValueChange={(e) => setCommentValue(e as string)}
                required={true}
              ></TextInput>
              <input type="submit" style={{ display: "none" }}></input>
            </form>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
