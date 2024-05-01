import express from "express";
import boardControllers from "../controllers/boardControllers.js";

import validateBody from "../decorators/validateBody.js";
import { boardSchema } from "../schemas/boardsSchemas.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const boardRouter = express.Router();

boardRouter.post(
	"/create-board",
	authenticate,
	validateBody(boardSchema),
	boardControllers.createBoard
);

export default boardRouter;
