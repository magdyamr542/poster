import * as React from "react";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import { Card, IconButton, Typography } from "@material-ui/core";

interface ShowAndHideToggleProps {
  titleAccess?: string;
  onClick: () => void;
  show: boolean;
  title?: string;
}

// toggle the hidden post
export const ShowAndHideToggle: React.FC<ShowAndHideToggleProps> = ({
  titleAccess = "show",
  onClick,
  show,
  title = "",
}) => {
  return (
    <div
      className={"showAndHideToggle_container"}
      style={{
        textAlign: "right",
        display: show ? "block" : "none",
        margin: "14px 0px",
      }}
    >
      <Card style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          color="primary"
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: 14,
            color: "rgba(0, 0, 0, 0.54)",
          }}
        >
          {title}
        </Typography>
        <IconButton style={{ marginRight: 20 }} onClick={onClick}>
          <RemoveRedEyeOutlinedIcon titleAccess={titleAccess} />
        </IconButton>
      </Card>
    </div>
  );
};
