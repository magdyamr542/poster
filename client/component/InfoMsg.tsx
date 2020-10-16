import * as React from "react";

export interface InfoMsgProps {
  msg: string;
  color: string;
}

export const InfoMsg: React.FC<InfoMsgProps> = ({ msg, color }) => {
  return (
    <div
      style={{
        color,
        fontSize: "20px",
        margin: "15px",
        whiteSpace: "pre-wrap",
      }}
    >
      {msg}
    </div>
  );
};
