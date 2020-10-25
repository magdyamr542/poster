import { Middleware } from "@reduxjs/toolkit";
import { AppState } from "./types";

export const logger: Middleware<
  {}, // legacy type parameter added to satisfy interface signature
  AppState
> = (store) => (next) => (action) => {
  console.group(action.type);
  console.info("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
};
