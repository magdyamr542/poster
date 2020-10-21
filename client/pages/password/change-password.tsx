import { Grid } from "@material-ui/core";
import * as React from "react";
import ChangePassword from "../../component/ChangePassword";

const changePassword: React.FC = ({}) => {
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "50vh", width: "80%", margin: "0 auto" }}
      >
        <Grid item xs={3} style={{ textAlign: "center", maxWidth: "30%" }}>
          <ChangePassword />
        </Grid>
      </Grid>
    </>
  );
};

export default changePassword;
