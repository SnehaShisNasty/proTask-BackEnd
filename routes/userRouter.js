import express from "express";
import userControllers from "../controllers/userControllers.js";
import {
  userEditThemeSchema,
  userNeedHelpSchema,
  userProfileEditSchema,
} from "../schemas/usersSchemas.js";
import validateBody from "../decorators/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const userRouter = express.Router();

userRouter.patch(
  "/edit/theme",
  authenticate,
  validateBody(userEditThemeSchema),
  userControllers.editTheme
);

userRouter.patch(
  "/edit/profile",
  authenticate,
  upload.single("avatar"),
  validateBody(userProfileEditSchema),
  userControllers.editProfile
);
userRouter.patch(
  "/need-help",
  authenticate,
  validateBody(userNeedHelpSchema),
  userControllers.needHelp
);

export default userRouter;
