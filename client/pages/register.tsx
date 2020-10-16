import { Grid, Button, TextField } from "@material-ui/core";
import * as React from "react";
import { Signup } from "../component/Signup";
interface props {}
const register: React.FC<props> = () => {
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
        <Signup />
      </Grid>
    </Grid>
  );
};

export default register;
