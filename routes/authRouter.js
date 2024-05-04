import express from "express";
import authControllers from "../controllers/authControllers.js";
import {
  userRegisterSchema,
  userLoginSchema,
  userEditThemeSchema,
  userNeedHelpSchema,
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
  "/avatars",
  upload.single("avatar"),
  authenticate,
  authControllers.changeAva
);
authRouter.post(
  "/need-help",
  authenticate,
  validateBody(userNeedHelpSchema),
  authControllers.needHelp
);

export default authRouter;
