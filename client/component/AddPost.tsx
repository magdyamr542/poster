import { Button, TextField, Typography } from "@material-ui/core";
import * as React from "react";
import { useState } from "react";
import { AxiosRequest } from "../interfaces/types";
import { AxiosRequestService } from "../services/AxiosRequestService";
import { PostService } from "../services/PostService";

interface AddPostProps {}

export const AddPost: React.FC<AddPostProps> = ({}) => {
  const leftAlignPadding = 25;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addPost = async (title: string, content: string) => {
    const request: AxiosRequest = AxiosRequestService.getAddPostRequest(
      title,
      content
    );
    const _post = await PostService.addPost(request);
    return _post;
  };

  const handleAddPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(title, content);
    const post = await addPost(title, content);
    console.log("the added post is ", post);
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
        />
        <TextField
          placeholder="Content ..."
          multiline
          rows={2}
          rowsMax={Infinity}
          className={"add_post_content"}
          style={{ margin: leftAlignPadding, width: "80%" }}
          onChange={(e) => setContent(e.target.value)}
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
