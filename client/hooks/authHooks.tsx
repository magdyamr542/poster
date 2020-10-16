import { useRouter } from "next/router";
import * as React from "react";
import { pageRoutes } from "../interfaces/enums";
import { AuthService } from "../services/AuthService";

export const useIsLoggedIn = (): boolean => {
  const currentUer = AuthService.getCurrentLoggedInUser();
  return currentUer ? true : false;
};

export const useRedirectIfNotLoggedIn = () => {
  const loggedIn = useIsLoggedIn();
  if (process.browser) {
    const router = useRouter();
    if (!loggedIn) {
      console.log("the user is not logged in and should be redirected");
      router.push(pageRoutes.SIGN_IN_PAGE);
    }
  }
};
