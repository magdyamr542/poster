import { Button, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";
import { TIME_TO_SHOW_INFO_MSG } from "../consts";
import { MsgInfoColors, pageRoutes } from "../interfaces/enums";
import { AuthService } from "../services/AuthService";
import { AxiosRequestService } from "../services/AxiosRequestService";
import { InfoMsg } from "./InfoMsg";
import TextInput from "./TextInput";

interface ChangePasswordProps {
  token: string; // use it to make the request of changing the password
}
const ChangePassword: React.FC<ChangePasswordProps> = ({ token }) => {
  const [password, setPassword] = useState<string>("");
  const [infoMsg, setInfoMsg] = useState<string>("");
  const [infoMsgColor, setInfoMsgColor] = useState<MsgInfoColors>(
    MsgInfoColors.SUCCESS
  );
  const router = useRouter();

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    changePassword(password)
      .then((changed) => {
        setInfoMsgColor(MsgInfoColors.SUCCESS);
        showInfoMsg("changed the password successfully!!");
        setPassword("");
        // redirect to the login page
        router.push(pageRoutes.SIGN_IN_PAGE);
      })
      .catch((e) => {
        setInfoMsgColor(MsgInfoColors.FAILURE);
        showInfoMsg("could not change the password!");
      });
  };

  const changePassword = async (pass: string) => {
    const request = AxiosRequestService.getChangePasswordRequest(pass, token);
    return new Promise<boolean>((resolve, reject) => {
      AuthService.changePassword(request)
        .then((user) => {
          console.log("changed the password", user);
          resolve(true);
        })
        .catch((e) => {
          console.log("err changing the password");
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
      <div
        className={"change-password_container"}
        style={{ textAlign: "center" }}
      >
        <Typography component="h1" variant="h5">
          Enter New Password
        </Typography>
        <form
          onSubmit={(e) => handleChangePassword(e)}
          className="change-password_form"
        >
          <TextInput
            label="password"
            type="password"
            required={true}
            selector="password_input"
            onValueChange={(val) => setPassword(val)}
            value={password}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Change Password
          </Button>
        </form>
        <InfoMsg msg={infoMsg} color={infoMsgColor}></InfoMsg>
      </div>
    </>
  );
};

export default ChangePassword;
