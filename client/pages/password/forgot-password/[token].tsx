import { NextPage } from "next";
import * as React from "react";

interface ForgotPasswordProps {
  token: string;
}
const ForgotPassword: NextPage<ForgotPasswordProps> = ({ token }) => {
  return <div> hello you forgot your password and your token is {token} </div>;
};

ForgotPassword.getInitialProps = async ({ query }) => {
  return { token: query.token as string };
};

export default ForgotPassword;
