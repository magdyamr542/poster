import * as React from "react";
import { AuthService } from "../services/AuthService";
import { NavbarLayout } from "./NavbarLayout";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const currentUser = AuthService.getCurrentLoggedInUser();

  return (
    <>
      <NavbarLayout username={currentUser?.username!} />
      {children}
    </>
  );
};
