import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Link,
} from "@material-ui/core";
import { useRouter } from "next/router";
import * as React from "react";
import { pageRoutes } from "../interfaces/enums";
import { AuthService } from "../services/AuthService";

interface NavbarLayoutProps {
  username: string;
}
export const NavbarLayout: React.FC<NavbarLayoutProps> = ({ username }) => {
  const router = useRouter();
  const handleLogout = () => {
    AuthService.logout();
    router.push(pageRoutes.SIGN_IN_PAGE);
  };
  return (
    <AppBar position="static">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="links">
          <Typography
            variant="h5"
            style={{ display: "inline-block", marginRight: 25 }}
          >
            Poster App
          </Typography>
          <Button
            color="inherit"
            onClick={(e) => router.push(pageRoutes.HOME_PAGE)}
          >
            Home
          </Button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <Typography variant="h6">{username}</Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};
