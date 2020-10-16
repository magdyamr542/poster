import { Grid } from "@material-ui/core";
import * as React from "react";
import { Login } from "../component/Login";
import { Signup } from "../component/Signup";
interface props {}
const login: React.FC<props> = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "50vh" }}
    >
      <Grid item xs={3} style={{ textAlign: "center" }}>
        <Login />
      </Grid>
    </Grid>
  );
};

export default login;
