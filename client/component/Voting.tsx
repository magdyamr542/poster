import * as React from "react";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { IconButton, Typography } from "@material-ui/core";
import { VoteEnum, VotingColors } from "../interfaces/enums";
interface VotingProps {
  upVote: number;
  downVote: number;
  onVote?: (vote: VoteEnum) => void;
  disableUpVote?: boolean;
  disableDownVote?: boolean;
}

export const Voting: React.FC<VotingProps> = ({
  upVote,
  downVote,
  onVote,
  disableUpVote = false,
  disableDownVote = false,
}) => {
  const getVotingColor = (num: number) => {
    if (num > 0) return VotingColors.GREEN;
    if (num < 0) return VotingColors.RED;
    return VotingColors.BLACK;
  };
  return (
    <div className={"voting_container"} style={{ display: "grid" }}>
      <IconButton
        style={{ padding: 0 }}
        onClick={(e) => onVote!(VoteEnum.UP)}
        disabled={disableUpVote}
      >
        <KeyboardArrowUpIcon
          fontSize={"large"}
          style={{ cursor: "pointer" }}
          titleAccess={"Upvote"}
        />
      </IconButton>

      <Typography
        style={{
          textAlign: "center",
          fontSize: 18,
          color: getVotingColor(upVote),
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        {upVote}
      </Typography>

      <Typography
        style={{
          textAlign: "center",
          fontSize: 18,
          color: getVotingColor(downVote),
          fontWeight: "bold",
        }}
      >
        {downVote}
      </Typography>

      <IconButton style={{ padding: 0 }} disabled={disableDownVote}>
        <KeyboardArrowDownIcon
          fontSize={"large"}
          style={{ cursor: "pointer" }}
          titleAccess={"Downvote"}
          onClick={(e) => onVote!(VoteEnum.DOWN)}
        />
      </IconButton>
    </div>
  );
};
