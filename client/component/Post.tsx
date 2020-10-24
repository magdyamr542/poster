import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import { EventEmitter } from "../EventEmitter";
import { Post as PostInterface, Comment } from "../interfaces/types";
import { EventsEnum, VoteEnum } from "../interfaces/enums";
import { useRouter } from "next/router";
import { Voting } from "./Voting";
import { ShowAndHideToggle } from "./ShowAndHideToggle";
import { useEffect, useState } from "react";
import { AxiosRequestService } from "../services/AxiosRequestService";
import { PostService } from "../services/PostService";
import { GREY_COLOR } from "../consts";
import { Comments } from "./Comments";
import { parseDate } from "../utils";

interface PostProps {
  title: string;
  content: string;
  username?: string; // display in the post ui
  _id: string; // for removing the post
  postEmitter?: EventEmitter<PostInterface>; // send notification that a post should be deleted
  createdAt?: Date;
  userId: string; // used to control which posts this user can delete
  upVote?: number;
  downVote?: number;
  comments?: Comment[];
}

export const Post: React.FC<PostProps> = ({
  title,
  content,
  _id,
  username,
  postEmitter,
  createdAt,
  userId,
  upVote,
  downVote,
  comments = [],
}) => {
  // getting hrefs for clickable links in this component
  const postHref: string = `/post/${_id}`;
  const userHref: string = `/user/${userId}`;
  const router = useRouter();
  const inPostPage = postEmitter ? false : true;
  // handlig post voting
  const [upVoteValue, setUpVoteValue] = useState<number>(upVote!);
  const [downVoteValue, setDownVoteValue] = useState<number>(downVote!);
  const [disableUpVote, setDisableUpVote] = useState<boolean>(false);
  const [disableDownVote, setDisableDownVote] = useState<boolean>(false);
  const [displayComments, setDisplayComments] = useState<boolean>(false);
  const [showPostTemplate, setShowPostTemplate] = useState<boolean>(true);
  const [commentsLength, setCommentsLength] = useState<number>(
    comments!.length || 0
  );

  // register the events needed in this component such as listening to adding a post
  // run this subscription only once at the first time
  useEffect(() => {
    // if there are handlers dut to component refreshing then do not subscribe
    if (postEmitter) {
      /* listen for adding a new comment */
      postEmitter!.on(EventsEnum.COMMENT_ADDED, ({ postId }: any) => {
        if (postId === _id) setCommentsLength((old) => old + 1);
      });
    }
  }, [postEmitter]);

  // check if the current user can delete this post
  const canDeletePost = PostService.canDeletePost(userId);
  // hide a post
  const handleHidePost = () => {
    setShowPostTemplate(false);
  };
  // delete a post
  const handleDeletePost = () => {
    postEmitter!.emit(EventsEnum.DELETE_POST, { userId, title, content, _id });
  };

  const handleShowHiddenPost = () => {
    // the post was hidden and we want to display it
    setShowPostTemplate(true);
  };

  // vote on the post
  const postVoted = (vote: VoteEnum) => {
    // make the server request to actually vote on the post
    const request = AxiosRequestService.getVotingRequest(_id, vote);
    const response = PostService.voteOnPost(request)
      .then((post) => {
        // set the ui when the request succeeds
        if (vote === VoteEnum.UP) {
          setUpVoteValue((old) => post.upVote!);
          setDisableUpVote(true);
        } else {
          setDownVoteValue((old) => post.downVote!);
          setDisableDownVote(true);
        }
      })
      .catch((e) => {
        console.log("error voting on the post", e);
      });
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
                      <Voting
                        upVote={upVoteValue!}
                        downVote={downVoteValue!}
                        onVote={postVoted}
                        disableUpVote={disableUpVote}
                        disableDownVote={disableDownVote}
                      />
                      <Typography
                        component="h2"
                        variant="h5"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginLeft: 15,
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
                        disabled={!canDeletePost}
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
                      {/* go to the page of this user */}
                      <Link href={userHref}>
                        <span
                          style={{
                            marginRight: 12,
                            fontWeight: "bold",
                            color: canDeletePost ? "#3f51b5" : GREY_COLOR,
                          }}
                        >
                          {username}
                        </span>
                      </Link>
                      <span>{parseDate(createdAt!)}</span>
                    </Typography>
                    <p style={{ wordBreak: "break-word", lineHeight: "30px" }}>
                      {content}
                    </p>
                    {/* display a btn for the comments to show */}
                    <p style={{ color: GREY_COLOR, textAlign: "right" }}>
                      <Link
                        href="#!"
                        color="inherit"
                        onClick={(_e: any) => setDisplayComments((old) => !old)}
                      >
                        {commentsLength} comment
                      </Link>
                    </p>
                  </CardContent>
                  <Comments
                    comments={comments}
                    display={displayComments}
                    postId={_id}
                    postEmitter={postEmitter}
                  />
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
