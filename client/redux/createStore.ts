import { configureStore, applyMiddleware, createStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { logger } from "./reduxMiddlewares";

export const store = createStore(rootReducer, applyMiddleware(logger));
