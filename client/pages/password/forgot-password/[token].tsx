import { Grid } from "@material-ui/core";
import { NextPage } from "next";
import * as React from "react";
import ChangePassword from "../../../component/ChangePassword";

interface ForgotPasswordProps {
  token: string;
}
const ForgotPassword: NextPage<ForgotPasswordProps> = ({ token }) => {
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
          <ChangePassword token={token} />
        </Grid>
      </Grid>
    </>
  );
};

ForgotPassword.getInitialProps = async ({ query }) => {
  return { token: query.token as string };
};

export default ForgotPassword;
