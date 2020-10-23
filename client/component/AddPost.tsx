import { Button, TextField, Typography } from "@material-ui/core";
import { EventEmitter } from "../EventEmitter";
import * as React from "react";
import { useState } from "react";
import { AxiosRequest, Post } from "../interfaces/types";
import { AxiosRequestService } from "../services/AxiosRequestService";
import { PostService } from "../services/PostService";
import { EventsEnum } from "../interfaces/enums";

interface AddPostProps {
  postEmitter: EventEmitter<Post>; // used to communicate with the posts component
}

export const AddPost: React.FC<AddPostProps> = ({ postEmitter }) => {
  const leftAlignPadding = 25;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addPost = async (title: string, content: string) => {
    const request: AxiosRequest = AxiosRequestService.getAddPostRequest(
      title,
      content
    );
    console.log("request made", request);
    const _post = await PostService.addPost(request);
    return _post;
  };

  const handleAddPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const post = await addPost(title, content);
    postEmitter.emit(EventsEnum.POST_ADDED, post); // publish that a post was added
    setTitle("");
    setContent("");
  };
  return (
    <>
      <form
        className={"add_post_form"}
        style={{
          margin: "40px 0",
          boxShadow: " 0 6px 4px -4px black",
          WebkitBoxShadow: "0 6px 4px -4px black",
          MozBoxShadow: "0 6px 4px -4px black",
          paddingBottom: 30,
        }}
        onSubmit={handleAddPost}
      >
        <Typography
          component="h1"
          variant="h5"
          style={{
            paddingLeft: leftAlignPadding,
            fontWeight: "bold",
          }}
        >
          Add Post
        </Typography>
        <TextField
          className={"add_post_label"}
          label="Title"
          style={{ margin: leftAlignPadding, width: "40%" }}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required={true}
        />
        <TextField
          placeholder="Content ..."
          multiline
          rows={2}
          rowsMax={Infinity}
          className={"add_post_content"}
          style={{ margin: leftAlignPadding, width: "80%" }}
          onChange={(e) => setContent(e.target.value)}
          value={content}
          required={true}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginLeft: 25, display: "block" }}
        >
          Add
        </Button>
      </form>
    </>
  );
};
