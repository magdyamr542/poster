import {
  Button,
  CircularProgress,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import { useState } from "react";
import TextInput from "./TextInput";
import axios, { AxiosAdapter } from "axios";
import { MsgInfoColors, Server_Routes } from "../interfaces/enums";
import { InfoMsg } from "./InfoMsg";
import {
  AuthResponse,
  AxiosRequest,
  InfoMsgInterface,
} from "../interfaces/types";
import { AuthService } from "../services/AuthService";
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
    const requets: AxiosRequest = {
      method: "post",
      data: { name, email, password },
      url: Server_Routes.SIGN_UP,
    };

    AuthService.signup(requets)
      .then((d) => {
        // show the msg of creation and hide the progress bar
        setShowProgressBar(false);
        showMsgThenHide({ msg: d.msg!, color: MsgInfoColors.SUCCESS }, 3000);
      })
      .catch((e: AuthResponse) => {
        // set an error msg
        setShowProgressBar(false);
        showMsgThenHide({ msg: e.msg!, color: MsgInfoColors.FAILURE }, 3000);
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
