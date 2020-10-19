import { Router } from "express";
import { PostController } from "../controllers/PostController";
import {
  checkJwt,
  checkRole,
  postDeleteAuth,
} from "../middlewares/authMiddleware";
const router = Router();
router.get("/", (req, res) => {
  res.send("coming from getting the posts");
});

router.get("/getPosts", [checkJwt], PostController.getPosts); // adding this middleware so only admins can access the users
router.post("/getPostById", [checkJwt], PostController.getPostById);
router.post("/addPost", [checkJwt], PostController.addPost);
router.get("/getUsersPosts", [checkJwt], PostController.getPostsOfUser);
router.delete(
  "/deletePosts",
  [checkJwt, checkRole],
  PostController.deletePosts
);

router.delete(
  "/deletePost",
  [checkJwt, postDeleteAuth],
  PostController.deletePost
);
export { router as post };
