import { Grid } from "@material-ui/core";
import * as React from "react";
import { Login } from "../component/Login";
interface props {}
const login: React.FC<props> = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "50vh", width: "80%", margin: "0 auto" }}
    >
      <Grid item xs={3} style={{ textAlign: "center", maxWidth: "30%" }}>
        <Login />
      </Grid>
    </Grid>
  );
};

export default login;
