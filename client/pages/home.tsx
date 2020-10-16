import * as React from "react";
import { Layout } from "../component/Layout";
import { NavbarLayout } from "../component/NavbarLayout";
import { useRedirectIfNotLoggedIn } from "../hooks/authHooks";
import { AuthService } from "../services/AuthService";
interface props {}
const home: React.FC<props> = () => {
  useRedirectIfNotLoggedIn();
  return (
    <>
      <Layout>
        <div>hello</div>
      </Layout>
    </>
  );
};

export default home;
