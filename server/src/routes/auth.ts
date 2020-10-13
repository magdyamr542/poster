import { Request, Response, Router } from "express";
import { UserController } from "../controllers/userController";
const router = Router();

router.get("/", (req: Request, res: Response) => {});

router.post("/register", UserController.register);
router.post("/login", UserController.login);

export { router as auth };
