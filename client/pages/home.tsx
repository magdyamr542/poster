import * as React from "react";
import { AddPost } from "../component/AddPost";
import { Layout } from "../component/Layout";
import { Posts } from "../component/Posts";
import { useRedirectIfNotLoggedIn } from "../hooks/authHooks";
import { store } from "../redux/createStore";
interface props {}
const home: React.FC<props> = () => {
  useRedirectIfNotLoggedIn();
  console.log(store);
  return (
    <>
      <Layout size={"normal"}>
        <AddPost />
        <Posts />
      </Layout>
    </>
  );
};

export default home;
