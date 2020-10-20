import {
  Button,
  Card,
  CardActions,
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
import { AuthService } from "../services/AuthService";
import { EventsEnum } from "../interfaces/enums";
import { useRouter } from "next/router";
import { Voting } from "./Voting";
import { ShowAndHideToggle } from "./ShowAndHideToggle";

interface PostProps {
  title: string;
  content: string;
  username?: string; // display in the post ui
  _id: string; // for removing the post
  postEmitter?: EventEmitter<PostInterface>; // send notification that a post should be deleted
  createdAt?: Date;
  userId: string; // used to control which posts this user can delete
}

export const Post: React.FC<PostProps> = ({
  title,
  content,
  _id,
  username,
  postEmitter,
  createdAt,
  userId,
}) => {
  const postHref: string = `/post/${_id}`;
  const router = useRouter();
  const inPostPage = postEmitter ? false : true;
  const [showPostTemplate, setShowPostTemplate] = React.useState<boolean>(true);
  // get the id of the current user
  const canDeletePost = (): boolean => {
    const currentUser = AuthService.getCurrentLoggedInUser();
    return currentUser?.id === userId;
  };
  // hide a post
  const handleHidePost = () => {
    setShowPostTemplate(false);
  };
  // delete a post
  const handleDeletePost = () => {
    postEmitter!.emit(EventsEnum.DELETE_POST, { userId, title, content, _id });
  };

  // parse the date
  const parseDate = () => {
    return new Date(createdAt!.toString()).toLocaleString();
  };

  const handleShowHiddenPost = () => {
    // the post was hidden and we want to display it
    setShowPostTemplate(true);
  };

  return (
    <>
      <div
        className="post_template_container"
        style={{ display: showPostTemplate ? "block" : "none" }}
      >
        <Grid item style={{ margin: "10px 0" }}>
          <div>
            <Card style={{ display: "flex" }}>
              <div style={{ flex: 1 }}>
                <CardContent>
                  {/* post header */}
                  <div
                    className="post_header"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginLeft: 16,
                    }}
                  >
                    <div
                      className="post_header_first_section"
                      style={{ display: "flex" }}
                    >
                      {/* voting */}
                      <Voting value={1} />
                      <Typography
                        component="h2"
                        variant="h5"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {title}
                      </Typography>
                    </div>
                    <div
                      className="icons"
                      style={{
                        display: inPostPage ? "none" : "flex",
                        marginRight: 25,
                        gridGap: 5,
                      }}
                    >
                      {/* hide icon */}
                      <IconButton
                        onClick={handleHidePost}
                        style={{ padding: 2, maxHeight: 50 }}
                      >
                        <RemoveRedEyeOutlinedIcon
                          style={{ marginRight: 10 }}
                          titleAccess={"hide"}
                        />{" "}
                      </IconButton>
                      {/* delete icon */}
                      <IconButton
                        onClick={handleDeletePost}
                        style={{ padding: 0, maxHeight: 50 }}
                        disabled={!canDeletePost()}
                      >
                        <DeleteIcon titleAccess={"delete"} />
                      </IconButton>
                    </div>
                  </div>
                  {/* additional info */}
                  <CardContent
                    className="post_info"
                    style={{ padding: "5px 16px" }}
                  >
                    <Typography variant="subtitle1" color={"textSecondary"}>
                      <span
                        style={{
                          marginRight: 12,
                          fontWeight: "bold",
                          color: canDeletePost() ? "#3f51b5" : "inherit",
                        }}
                      >
                        {username}
                      </span>{" "}
                      <span>{parseDate()}</span>
                    </Typography>
                    <p style={{ wordBreak: "break-word" }}>{content}</p>
                  </CardContent>
                  <CardActions
                    style={{ display: inPostPage ? "none" : "block" }}
                  >
                    <Button
                      size="small"
                      color="default"
                      style={{ fontFamily: "sans-serif" }}
                      onClick={(e) => router.push(postHref)}
                      variant="outlined"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </CardContent>
              </div>
            </Card>
          </div>
        </Grid>
      </div>
      <ShowAndHideToggle
        onClick={handleShowHiddenPost}
        show={showPostTemplate ? false : true}
        title={title}
      />
    </>
  );
};
