import { Button, Typography } from "@material-ui/core";
import * as React from "react";
import { useState } from "react";
import { TIME_TO_SHOW_INFO_MSG } from "../consts";
import { MsgInfoColors } from "../interfaces/enums";
import { AuthService } from "../services/AuthService";
import { AxiosRequestService } from "../services/AxiosRequestService";
import { InfoMsg } from "./InfoMsg";
import TextInput from "./TextInput";

const ChangePasswordAuth: React.FC = ({}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [infoMsg, setInfoMsg] = useState<string>("");
  const [infoMsgColor, setInfoMsgColor] = useState<MsgInfoColors>(
    MsgInfoColors.SUCCESS
  );

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // make a request to the db and check if the supplied email and username exist.
    // if they exist then display the msg that the user should check their email
    let userExists = checkIfUserExists(name, email)
      .then((sent) => {
        setInfoMsgColor(MsgInfoColors.SUCCESS);
        showInfoMsg("we sent you an email please verify it");
        setName("");
        setEmail("");
      })
      .catch((e) => {
        setInfoMsgColor(MsgInfoColors.FAILURE);
        showInfoMsg("data are wrong");
      });
  };

  const checkIfUserExists = async (
    name: string,
    email: string
  ): Promise<boolean> => {
    const request = AxiosRequestService.getUserByNameAndEmailRequest(
      name,
      email
    );
    return new Promise<boolean>((resolve, reject) => {
      AuthService.changePasswordAuth(request)
        .then((res) => {
          resolve(true);
        })
        .catch((e) => {
          reject(false);
        });
    });
  };

  const showInfoMsg = (msg: string) => {
    setInfoMsg(msg);
    setTimeout(() => {
      setInfoMsg("");
    }, TIME_TO_SHOW_INFO_MSG);
  };
  return (
    <>
      <div className={"change-password_container"}>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <form
          onSubmit={(e) => handleChangePassword(e)}
          className="change-password_form"
        >
          <TextInput
            label="Name"
            type="text"
            required={true}
            selector="name_input"
            onValueChange={(val) => setName(val)}
            value={name}
          />
          <TextInput
            label="Email"
            type="text"
            required={true}
            selector="email_input"
            onValueChange={(val) => setEmail(val)}
            value={email}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Send
          </Button>
        </form>
        <InfoMsg msg={infoMsg} color={infoMsgColor}></InfoMsg>
      </div>
    </>
  );
};

export default ChangePasswordAuth;
