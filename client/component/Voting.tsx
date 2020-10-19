import * as React from "react";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { IconButton, Typography } from "@material-ui/core";
import { VotingColors } from "../interfaces/enums";
interface VotingProps {
  value: number;
}

export const Voting: React.FC<VotingProps> = ({ value }) => {
  const getVotingColor = (num: number) => {
    if (num > 0) return VotingColors.GREEN;
    if (num < 0) return VotingColors.RED;
    return VotingColors.BLACK;
  };
  return (
    <div className={"voting_container"} style={{ display: "grid" }}>
      <IconButton style={{ padding: 0 }}>
        <KeyboardArrowUpIcon
          fontSize={"large"}
          style={{ cursor: "pointer" }}
          titleAccess={"Upvote"}
        />
      </IconButton>

      <Typography
        style={{
          textAlign: "center",
          fontSize: 25,
          color: getVotingColor(value),
          fontWeight: "bold",
        }}
      >
        {value}
      </Typography>

      <IconButton style={{ padding: 0 }}>
        <KeyboardArrowDownIcon
          fontSize={"large"}
          style={{ cursor: "pointer" }}
          titleAccess={"Downvote"}
        />
      </IconButton>
    </div>
  );
};
