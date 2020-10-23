import { Router } from "express";
import { CommentController } from "../controllers/CommentController";
import { checkJwt } from "../middlewares/authMiddleware";
const router = Router();
router.post("/addComment", [checkJwt], CommentController.addComment); // vote for a post
export { router as comment };
