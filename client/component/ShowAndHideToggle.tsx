import * as React from "react";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import { Card, IconButton } from "@material-ui/core";

interface ShowAndHideToggleProps {
  titleAccess?: string;
}

// toggle the hidden post
export const ShowAndHideToggle: React.FC<ShowAndHideToggleProps> = ({
  titleAccess = "show",
}) => {
  return (
    <div
      className={"showAndHideToggle_container"}
      style={{
        textAlign: "right",
      }}
    >
      <Card>
        <IconButton style={{ marginRight: 20 }}>
          <RemoveRedEyeOutlinedIcon titleAccess={titleAccess} />
        </IconButton>
      </Card>
    </div>
  );
};
