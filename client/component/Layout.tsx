import { route } from "next/dist/next-server/server/router";
import { useRouter } from "next/router";
import * as React from "react";
import { useIsLoggedIn, useRedirectIfNotLoggedIn } from "../hooks/authHooks";
import { pageRoutes } from "../interfaces/enums";
import { AuthService } from "../services/AuthService";
import { NavbarLayout } from "./NavbarLayout";

interface LayoutProps {}
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  useRedirectIfNotLoggedIn(); // redirects the user if he is not logged in
  const currentUser = AuthService.getCurrentLoggedInUser();
  return (
    <>
      <NavbarLayout username={currentUser?.username!} />
      {children}
    </>
  );
};
