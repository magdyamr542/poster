import * as React from "react";
import { useRedirectIfNotLoggedIn } from "../hooks/authHooks";
import { AuthService } from "../services/AuthService";
import { NavbarLayout } from "./NavbarLayout";

interface LayoutProps {}
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  useRedirectIfNotLoggedIn(); // redirects the user if he is not logged in
  const currentUser = AuthService.getCurrentLoggedInUser();
  // display loading until redirecting
  if (!currentUser) {
    return <div>loading ...</div>;
  }
  return (
    <>
      <NavbarLayout username={currentUser?.username!} />
      {children}
    </>
  );
};
