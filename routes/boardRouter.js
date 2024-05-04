import express from "express";
import boardControllers from "../controllers/boardControllers.js";

import validateBody from "../decorators/validateBody.js";
import {
	createBoardSchema,
	editBoardSchema,
} from "../schemas/boardsSchemas.js";

import isValidId from "../middlewares/isValidId.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const boardRouter = express.Router();

boardRouter.use(authenticate);

boardRouter.get("/", boardControllers.getAllBoards);
boardRouter.get("/:id", boardControllers.getOneBoard);

boardRouter.post(
	"/create-board",
	validateBody(createBoardSchema),
	boardControllers.createBoard
);

boardRouter.put(
	"/:id",
	isValidId,
	validateBody(editBoardSchema),
	boardControllers.editBoard
);

boardRouter.delete("/:id", isValidId, boardControllers.deleteBoard);

export default boardRouter;
