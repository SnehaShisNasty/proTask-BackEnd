import express from "express";
import authControllers from "../controllers/authControllers.js";
import {
  authRegisterSchema,
  authLoginSchema,
  authRefreshTokenSchema,
} from "../schemas/authSchemas.js";
import validateBody from "../decorators/validateBody.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(authRegisterSchema),
  authControllers.register
);

authRouter.post("/login", validateBody(authLoginSchema), authControllers.login);
authRouter.post(
  "/refresh",
  validateBody(authRefreshTokenSchema),
  authControllers.refresh
);

authRouter.get("/current", authenticate, authControllers.current);

authRouter.post("/logout", authenticate, authControllers.logout);

export default authRouter;
