import { Router } from "express";
import { auth } from "./auth";
import { post } from "./post";
import { user } from "./user";
import { comment } from "./comment";

const router = Router();
router.use("/auth", auth);
router.use("/user", user);
router.use("/post", post);
router.use("/comment", comment);

export { router };
