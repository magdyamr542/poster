import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import { EventEmitter } from "../EventEmitter";
import { Post as PostInterface } from "../interfaces/types";
import { EventsEnum } from "../interfaces/enums";

interface PostProps {
  title: string;
  content: string;
  username?: string; // display in the post ui
  _id: string; // for removing the post
  postEmitter: EventEmitter<PostInterface>; // send notification that a post should be deleted
}

export const Post: React.FC<PostProps> = ({
  title,
  content,
  _id,
  username,
  postEmitter,
}) => {
  const handleHidePost = () => {
    console.log(postEmitter);
    postEmitter.emit(EventsEnum.HIDE_POST, { title, content, _id });
  };

  const handleRemovePost = () => {
    console.log("remove the post");
  };
  return (
    <Grid item style={{}}>
      <CardActionArea component="a" href="#!">
        <Card style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            <CardContent>
              <div className="label_delete_section">
                <Typography component="h2" variant="h5" display={"inline"}>
                  {title}
                </Typography>
                <div
                  className="icons"
                  style={{ marginLeft: "90%", display: "inline" }}
                >
                  <IconButton onClick={handleHidePost} style={{ padding: 0 }}>
                    <RemoveRedEyeOutlinedIcon
                      style={{ marginRight: 10 }}
                      titleAccess={"hide"}
                    />{" "}
                  </IconButton>

                  <IconButton onClick={handleRemovePost} style={{ padding: 0 }}>
                    <DeleteIcon titleAccess={"delete"} />
                  </IconButton>
                </div>
              </div>
              <Typography variant="subtitle1" color="textSecondary">
                {username}
              </Typography>
              <p>{content}</p>
            </CardContent>
          </div>
        </Card>
      </CardActionArea>
    </Grid>
  );
};
