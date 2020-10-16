import * as React from "react";
import { Layout } from "../component/Layout";
import { NavbarLayout } from "../component/NavbarLayout";
import { AuthService } from "../services/AuthService";
interface props {}
const home: React.FC<props> = () => {
  return (
    <>
      <Layout>
        <div>hello</div>
      </Layout>
    </>
  );
};

export default home;
