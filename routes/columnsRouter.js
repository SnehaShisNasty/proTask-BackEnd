import express from "express";
import boardControllers from "../controllers/boardControllers.js";

import validateBody from "../decorators/validateBody.js";
import {
	createBoardSchema,
	editBoardSchema,
} from "../schemas/boardsSchemas.js";

import isValidId from "../middlewares/isValidId.js";
import authenticate from "../middlewares/authenticate.js";

const columnRouter = express.Router();

columnRouter.use(authenticate);

columnRouter.get("/", boardControllers.getAllBoards);

columnRouter.post(
	"/create-column",
	validateBody(createBoardSchema),
	boardControllers.createBoard
);

columnRouter.put(
	"/:id",
	isValidId,
	validateBody(editBoardSchema),
	boardControllers.editBoard
);

columnRouter.delete("/:id", isValidId, boardControllers.deleteBoard);

export default columnRouter;
