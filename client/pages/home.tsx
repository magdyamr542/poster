import * as React from "react";
import { NavbarLayout } from "../component/NavbarLayout";
import { AuthService } from "../services/AuthService";
interface props {}
const home: React.FC<props> = () => {
  const currentUer = AuthService.getCurrentLoggedInUser();
  return (
    <>
      <NavbarLayout></NavbarLayout>
    </>
  );
};

export default home;
