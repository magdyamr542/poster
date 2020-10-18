import { Button, TextField, Typography } from "@material-ui/core";
import * as React from "react";

interface AddPostProps {}

export const AddPost: React.FC<AddPostProps> = ({}) => {
  const leftAlignPadding = 25;
  return (
    <>
      <form
        className={"add_post_form"}
        style={{
          margin: "40px 0",
          boxShadow: " 0 6px 4px -4px black",
          WebkitBoxShadow: "0 6px 4px -4px black;",
          MozBoxShadow: "0 6px 4px -4px black",
          paddingBottom: 30,
        }}
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
        />
        <TextField
          placeholder="Content ..."
          multiline
          rows={2}
          rowsMax={Infinity}
          className={"add_post_content"}
          style={{ margin: leftAlignPadding, width: "80%" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginLeft: 25 }}
        >
          Add
        </Button>
      </form>
    </>
  );
};
