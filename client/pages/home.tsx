import * as React from "react";
import { Layout } from "../component/Layout";
import { Posts } from "../component/Posts";
import { useRedirectIfNotLoggedIn } from "../hooks/authHooks";
interface props {}
const home: React.FC<props> = () => {
  useRedirectIfNotLoggedIn();
  return (
    <>
      <Layout size={"normal"}>
        <Posts />
      </Layout>
    </>
  );
};

export default home;
