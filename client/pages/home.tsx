import * as React from "react";
import { AddPost } from "../component/AddPost";
import { Layout } from "../component/Layout";
import { Posts } from "../component/Posts";
import { EventEmitter } from "../EventEmitter";
import { useRedirectIfNotLoggedIn } from "../hooks/authHooks";
import { Post } from "../interfaces/types";
interface props {}
const home: React.FC<props> = () => {
  useRedirectIfNotLoggedIn();
  const postEventEmitter = new EventEmitter<Post | any>();

  return (
    <>
      <Layout size={"normal"}>
        <AddPost postEmitter={postEventEmitter} />
        <Posts postEmitter={postEventEmitter} />
      </Layout>
    </>
  );
};

export default home;
