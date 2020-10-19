import * as React from "react";

type InfoMsgDisplayType = "none" | "block";

export interface InfoMsgProps {
  msg: string;
  color: string;
  display?: InfoMsgDisplayType;
}

export const InfoMsg: React.FC<InfoMsgProps> = ({ msg, color, display }) => {
  return (
    <div
      style={{
        color,
        fontSize: "20px",
        margin: "15px",
        whiteSpace: "pre-wrap",
        display: display ? display : "block",
      }}
    >
      {msg}
    </div>
  );
};
