import { Router } from "express";
import { UserController } from "../controllers/userController";
import { Roles } from "../dataShapes/enums";
import { checkJwt, checkRole } from "../middlewares/authMiddleware";
const router = Router();

const rolesWhichHaveAccessToRecords = [Roles.ADMIN]; // you can extend this to another rules you like

router.get("/", (req, res) => {
  res.send("coming from getting the user");
});

router.get(
  "/getUsers",
  [checkJwt, checkRole(rolesWhichHaveAccessToRecords)],
  UserController.getAllUsers
); // adding this middleware so only admins can access the users
router.get(
  "/getUserById",
  [checkJwt, checkRole(rolesWhichHaveAccessToRecords)],
  UserController.getUserById
);
router.delete(
  "/deleteAll",
  [checkJwt, checkRole(rolesWhichHaveAccessToRecords)],
  UserController.deleteAllUsers
);

export { router as user };
