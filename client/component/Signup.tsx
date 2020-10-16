import { Button, CircularProgress, Typography } from "@material-ui/core";
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
import { setCookieToClient } from "../services/cookieService";
import { TIME_TO_SHOW_INFO_MSG } from "../consts";
import { AxiosRequestService } from "../services/AxiosRequestService";

export const Signup: React.FC<{}> = () => {
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
    const request = AxiosRequestService.signupRequest(name, email, password);
    AuthService.signup(request)
      .then((d) => {
        console.log(d.data);
        // show the msg of creation and hide the progress bar
        setShowProgressBar(false);
        showMsgThenHide(
          { msg: d.msg!, color: MsgInfoColors.SUCCESS },
          TIME_TO_SHOW_INFO_MSG
        );
        // redirect the user to the sign in page which is very similar
        router.push(pageRoutes.SIGN_IN_PAGE);
        setCookieToClient("token", d.token!);
      })
      .catch((e: AuthResponse) => {
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
      <div className="singup_label" style={{ textAlign: "center" }}>
        <Typography component="h1" variant="h5">
          Sign Up
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
          Sign Up
        </Button>
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
    </>
  );
};
