import * as React from "react";
import { getCookie, parseJwtToken } from "../services/cookieService";
import * as jsCooke from "js-cookie";
interface loginProps {}

export const login: React.FC<loginProps> = ({}) => {
  // get the username based on the token
  let username = "";
  if (process.browser) {
    username = parseJwtToken(jsCooke.get("token")!).username;
  }
  return (
    <div>
      {" "}
      <h1>hello {username || "sfsdf"}</h1>{" "}
    </div>
  );
};

export default login;
