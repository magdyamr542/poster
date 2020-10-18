import { useRouter } from "next/router";
import * as React from "react";
import { useRedirectIfNotLoggedIn } from "../hooks/authHooks";
const main = () => {
  useRedirectIfNotLoggedIn();
  if (process.browser) {
    const router = useRouter();
    router.push("/home");
  }
  return <h1>redirecting ...</h1>;
};
export default main;
