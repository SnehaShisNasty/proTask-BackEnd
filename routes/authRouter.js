import express from "express";
import authControllers from "../controllers/authControllers.js";
import {
  userRegisterSchema,
  userLoginSchema,
  userEditThemeSchema,
  userProfileEditSchema,
} from "../schemas/usersSchemas.js";
import validateBody from "../decorators/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userRegisterSchema),
  authControllers.register
);
authRouter.post("/login", validateBody(userLoginSchema), authControllers.login);

authRouter.post(
  "/edit/theme",
  authenticate,
  validateBody(userEditThemeSchema),
  authControllers.editTheme
);

authRouter.post("/logout", authenticate, authControllers.logout);

authRouter.patch(
  "/profile",
  authenticate,
  upload.single("avatar"),
  validateBody(userProfileEditSchema),
  authControllers.editProfile
);

export default authRouter;
