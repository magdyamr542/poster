import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import * as React from "react";

interface NavbarLayoutProps {}
export const NavbarLayout: React.FC<NavbarLayoutProps> = ({ children }) => {
  return (
    <AppBar position="static">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">Poster App</Typography>
        <Typography variant="h6">Welcome Amr </Typography>
        <Button color="inherit" style={{ float: "right" }}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};
