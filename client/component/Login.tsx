import {
  Button,
  CircularProgress,
  Grid,
  Link,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import { useState } from "react";
import TextInput from "./TextInput";
import { MsgInfoColors, pageRoutes, Server_Routes } from "../interfaces/enums";
import { InfoMsg } from "./InfoMsg";
import {
  AuthResponse,
  AxiosRequest,
  InfoMsgInterface,
} from "../interfaces/types";
import { AuthService } from "../services/AuthService";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { setCookieToClient } from "../services/cookieService";
import { TIME_TO_SHOW_INFO_MSG } from "../consts";
import { AxiosRequestService } from "../services/AxiosRequestService";

export const Login: React.FC<{}> = () => {
  // setup
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [showNotificationMsg, setShowNotificationMsg] = useState(false);
  const [infoMsg, setInfoMsg] = useState<InfoMsgInterface>({
    msg: "",
    color: "green",
  });
  const router = useRouter();

  // showing the info msg for some time
  const showMsgThenHide = (infomsg: InfoMsgInterface, time: number) => {
    setShowNotificationMsg(true);
    setInfoMsg(infomsg);
    setTimeout(() => {
      setShowNotificationMsg(false);
    }, time);
  };

  const hanldeFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // show the progress bar and an info msg of loggin in
    setShowProgressBar(true);
    const requets: AxiosRequest = AxiosRequestService.loginRequest(
      name,
      email,
      password
    );
    AuthService.login(requets)
      .then((d) => {
        // show the msg of creation and hide the progress bar
        setShowProgressBar(false);
        showMsgThenHide(
          { msg: d.msg!, color: MsgInfoColors.SUCCESS },
          TIME_TO_SHOW_INFO_MSG
        );
        setCookieToClient("token", d.token!);
        // redirect the user to the Welcome Page
        router.push(pageRoutes.HOME_PAGE);
      })
      .catch((e: AuthResponse) => {
        console.log({ e });
        // set an error msg
        setShowProgressBar(false);
        showMsgThenHide(
          { msg: e.msg!, color: MsgInfoColors.FAILURE },
          TIME_TO_SHOW_INFO_MSG
        );
      });
  };
  return (
    <>
      <div className="sign_in_container">
        <div className="singup_label" style={{ textAlign: "center" }}>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
        </div>
        <form onSubmit={hanldeFormSubmit} className="signup_form">
          <TextInput
            label="Name"
            type="text"
            required={true}
            selector="name_input"
            onValueChange={(val) => setName(val)}
          />
          <TextInput
            label="Email"
            type="text"
            required={true}
            selector="email_input"
            onValueChange={(val) => setEmail(val)}
          />
          <TextInput
            label="Password"
            type="text"
            required={true}
            selector="password_input"
            onValueChange={(val) => setPassword(val)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Login
          </Button>
          {/* sign up if not having an account or reset the password if forgot it */}
          <Grid
            container
            style={{
              marginTop: 10,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <Grid item xs>
              <NextLink href="/login">
                <Link href="#" variant="body2" style={{ float: "left" }}>
                  Forgot password?
                </Link>
              </NextLink>
            </Grid>
            <Grid item>
              <NextLink href="/register">
                <Link href="#" variant="body2" style={{ float: "right" }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </form>

        {/* The notification */}
        <CircularProgress
          style={{
            margin: "20px auto",
            display: showProgressBar ? "block" : "none",
          }}
        />
        <div
          className="info_msg"
          style={{ display: showNotificationMsg ? "block" : "none" }}
        >
          <InfoMsg {...infoMsg} />
        </div>
      </div>
    </>
  );
};
