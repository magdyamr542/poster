import { CircularProgress } from "@material-ui/core";
import * as React from "react";
interface ProgressWithMsgProps {
  msg: string;
}

export const ProgressWithMsg: React.FC<ProgressWithMsgProps> = ({ msg }) => {
  return (
    <>
      <div className={"progress_with_msg_container"}>
        <div style={{ marginRight: "20px", display: "inline" }}>{msg}</div>
        <CircularProgress
          style={{ width: "30px", height: 30, marginTop: 30 }}
        />
      </div>
    </>
  );
};
