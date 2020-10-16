import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import * as React from "react";

interface NavbarLayoutProps {
  username: string;
}
export const NavbarLayout: React.FC<NavbarLayoutProps> = ({ username }) => {
  return (
    <AppBar position="static">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">Poster App</Typography>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <Typography variant="h6">{username}</Typography>
          <Button color="inherit">Logout</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};
