import { route } from "next/dist/next-server/server/router";
import { useRouter } from "next/router";
import * as React from "react";
import { pageRoutes } from "../interfaces/enums";
import { AuthService } from "../services/AuthService";
import { NavbarLayout } from "./NavbarLayout";

interface LayoutProps {}
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const currentUser = AuthService.getCurrentLoggedInUser();
  const router = useRouter();
  if (!currentUser && process.browser) {
    // redirect the user to the login page
    router.push(pageRoutes.SIGN_IN_PAGE);
    return <div>You are not logged in. Redirecting...</div>;
  }
  return (
    <>
      <NavbarLayout username={currentUser?.username!} />
      {children}
    </>
  );
};
